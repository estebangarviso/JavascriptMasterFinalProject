import Component from '@helpers/Component'
import ShoppingcartProduct from './ShoppingcartProduct'
import { CartSubtotalsType, CartTotalType } from '@types'
import Data from '@helpers/Data'
import Currency from '@components/common/currency'
import Carrier from '@components/common/carrier'
import { ProductInterface } from '@interfaces'

export default class Shoppingcart extends Component {
  private currency: Currency
  private carrier: Carrier
  private data: Data
  private _products: ShoppingcartProduct[] = []
  private set products(cart_products: ShoppingcartProduct[]) {
    this._products = cart_products
  }
  public get products() {
    return this._products
  }
  private _products_quantity: number = 0
  private set products_quantity(quantity: number) {
    this._products_quantity = quantity
  }
  public get products_quantity(): number {
    return this._products_quantity
  }

  private _subtotals?: CartSubtotalsType
  private set subtotals(args: CartSubtotalsType) {
    this._subtotals = args
  }
  public get subtotals() {
    return this._subtotals
  }

  private _total?: CartTotalType
  private set total(args: CartTotalType) {
    this._total = args
  }
  public get total() {
    return this._total
  }

  constructor(data: { data: Data; currency: Currency; carrier: Carrier }) {
    super()
    this.data = data.data
    this.currency = data.currency
    this.carrier = data.carrier
  }

  public build() {
    let cart_products = Data.getCartProducts()
    let products = cart_products.map((product) => {
      let _product: ProductInterface = this.data.getProductById(
        product.id_product
      )

      return new ShoppingcartProduct(
        this.currency,
        _product,
        product.cart_quantity
      )
    })

    this.products = products
    this.setQuantities()
    this.setSubtotals()
  }

  private setQuantities() {
    if (this.products && this.products.length > 0) {
      this.products_quantity = this.products.reduce(
        (accumulator, product) => product.cart_quantity + accumulator,
        0
      )
    }
  }

  private setSubtotals() {
    let products, shipping
    if (this.products && this.products.length > 0) {
      let carrier = this.carrier
      products = (() => {
        let amount = this.products.reduce(
            (accumulator, product) =>
              product.price_amount !== undefined
                ? product.price_amount + accumulator
                : 0,
            0
          ),
          label = 'Productos',
          value = this.currency.format(amount)
        return { amount, label, value }
      })()
      shipping = (() => {
        let amount =
            carrier.fixed_price +
            this.products.reduce((accumulator, product) => {
              return product.cart_quantity * carrier.per_package + accumulator
            }, 0),
          label = 'Envío',
          value = this.currency.format(amount)
        return { amount: amount, label: label, value: value }
      })()
      this.subtotals = { products, shipping }

      if (this.subtotals.products && this.subtotals.shipping) {
        let amount =
            this.subtotals.products.amount + this.subtotals.shipping.amount,
          label = 'Total',
          value = this.currency.format(amount)
        this.total = { amount, label, value }
      }
    }
  }

  public refresh() {
    this.setQuantities()
    this.setSubtotals()
  }

  public addProduct(id_product: number, quantity: number) {
    let _product = this.data.getProductById(id_product)
    let product = new ShoppingcartProduct(this.currency, _product, quantity)
    this.products.push(product)

    localStorage.setItem(
      'cart_products',
      JSON.stringify(
        this.products.map((product) => {
          return {
            id_product: product.id_product,
            cart_quantity: product.cart_quantity,
          }
        })
      )
    )
    this.refresh()
  }

  public increaseProduct(id_product: number) {
    for (let product of this.products) {
      if (product.id_product === id_product) {
        product.increase
        continue
      }
    }
  }

  public decreaseProduct(id_product: number) {
    for (let product of this.products) {
      if (product.id_product === id_product) {
        product.decrease
        continue
      }
    }
  }

  public deleteProduct(id_product: number) {
    this.products.filter((product) => product.id_product !== id_product)
  }

  public init() {
    this.build()
    this.render()
  }

  public render() {
    document.getElementById(
      'js-shopping-cart'
    ).innerHTML = `${this.renderProducts}${this.renderEmpty}`
  }

  private get hasProducts(): boolean {
    let isValid = true
    if (this.products.length === 0) isValid = false
    return isValid
  }

  private get renderProducts() {
    if (this.hasProducts) {
      return /* HTML */ `<ul class="cart-products">
          <li>${this.products.map((product) => product.render)}</li>
        </ul>
        <div class="shopping-cart-buttons text-center text-uppercase">
          <a
            href="javascript:void(0)"
            class="shopping-cart-confirm-btn btn btn-primary btn-block btn-lg mb-2"
          >
            Realizar compra</a
          >
          <a
            href="javascript:void(0)"
            class="shopping-cart-restore-btn btn btn-secondary btn-block btn-lg"
          >
            Restaurar productos</a
          >
        </div>`
    } else return ''
  }

  private get renderEmpty() {
    if (!this.hasProducts)
      return /* HTML */ `<p class="h6">No hay productos en su carro</p>`
    else return ''
  }
}
