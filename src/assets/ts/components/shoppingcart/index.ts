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
    this.refresh()
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
  public actions() {
    // Enable add to cart buttons if customer is logged
    const addToCartBtns = document.querySelectorAll(
      '.product-add-cart .add-to-cart'
    )
    if (addToCartBtns)
      addToCartBtns.forEach((btn) =>
        btn.addEventListener(
          'click',
          (event) => {
            const target = event.target as HTMLElement
            const product = target.closest('.js-product-miniature')
            const id_product = product.getAttribute('data-id-product')
            const qty = (
              product.querySelector('.input-qty') as HTMLInputElement
            ).value
            console.log(target)
            this.addProduct(Number(id_product), Number(qty))
          },
          false
        )
      )
    // Remove all products button
    const removeAll = document.getElementById('shopping-cart-restore-btn')
    if (removeAll)
      removeAll.addEventListener('click', (event: Event) => {
        this.products = []
        this.refresh()
      })
  }
  public build() {
    let cart_products = Data.getCartProducts()
    if (cart_products.length) {
      let products = cart_products.map((product) => {
        let _product: ProductInterface = this.data.getProductById(
          product.id_product
        )
        let cart_product = new ShoppingcartProduct(
          this.currency,
          _product,
          product.cart_quantity
        )

        return cart_product
      })
      this.products = products
      this.setQuantities()
      this.setSubtotals()
    }
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
                ? product.price_amount * product.cart_quantity + accumulator
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
    this.setQuantities()
    this.setSubtotals()
    this.render()
    this.actions()
  }

  public addProduct(id_product: number, quantity: number) {
    let _product = this.data.getProductById(id_product)
    let product = new ShoppingcartProduct(this.currency, _product, quantity)
    if (this.products && this.products.length) {
      let cart_product = this.products.filter(
        (product) => product.id_product === id_product
      )[0]
      console.log({
        cart_product: cart_product,
        qty: quantity,
      })
      if (cart_product) cart_product.fix = cart_product.cart_quantity + quantity

      let rest_products = this.products.filter(
        (product) => product.id_product !== id_product
      )
      if (cart_product) this.products = [...rest_products, cart_product]
      else this.products = [...rest_products, product]
    } else {
      this.products.push(product)
    }

    this.refresh()
  }

  public increaseProduct(id_product: number) {
    for (let product of this.products) {
      if (product.id_product === id_product) {
        product.increase
        continue
      }
    }
    this.refresh()
  }

  public decreaseProduct(id_product: number) {
    for (let product of this.products) {
      if (product.id_product === id_product) {
        product.decrease
        continue
      }
    }
    this.refresh()
  }

  public removeProduct(id_product: number) {
    this.products.filter((product) => product.id_product !== id_product)
    this.refresh()
  }

  public removeAll() {
    this.products = []
    localStorage.removeItem('cart_products')
    this.refresh()
  }

  public init() {
    this.build()
    this.render()
    this.actions()
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
          ${this.products
            .map((product) => `<li>${product.render()}</li>`)
            .join('')}
        </ul>
        <div class="row">
          <div class="col col-12">
            <div class="row col-12">
              <div class="col col-6 h3 fw-bold">
                ${this.subtotals.products.label}
              </div>
              <span
                class="col col-6 h3 product-price"
                content="${this.subtotals.products.amount}"
                >${this.subtotals.products.value}</span
              >
            </div>
            <div class="row col-12">
              <div class="col col-6 h3 fw-bold">
                ${this.subtotals.shipping.label}
              </div>
              <div
                class="col col-6 h3 product-price"
                content="${this.subtotals.shipping.amount}"
              >
                ${this.subtotals.shipping.value}
              </div>
            </div>
            <div class="row col-12">
              <div class="col col-6 h3 fw-bold">${this.total.label}</div>
              <div
                class="col col-6 h3 product-price"
                content="${this.total.amount}"
              >
                ${this.total.value}
              </div>
            </div>
          </div>
        </div>
        <div class="shopping-cart-buttons text-center text-uppercase">
          <a
            href="javascript:void(0)"
            id="shopping-cart-confirm-btn"
            class="btn btn-primary w-100 btn-lg mb-2"
          >
            Realizar compra</a
          >
          <a
            href="javascript:void(0)"
            id="shopping-cart-restore-btn"
            class="btn btn-secondary w-100 btn-lg"
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
