import Currency from '@components/common/currency'
import Component from '@helpers/Component'
import Data from '@helpers/Data'
import { ProductInterface, ShoppingcartProductInterface } from '@interfaces'

export default class ShoppingcartProduct
  extends Component
  implements ShoppingcartProductInterface
{
  public init(): void {
    throw new Error('Method not implemented.')
  }
  public id_product?: number
  public name?: string
  public sku?: string
  public brand?: string
  public img?: string
  public price_amount?: number
  public price?: string
  public total?: string
  public cart_quantity: number = 0
  private currency: Currency

  constructor(
    currency: Currency,
    product: ProductInterface,
    cart_quantity: number
  ) {
    super()
    this.currency = currency
    this.id_product = product.id_product
    this.name = product.name
    this.sku = product.sku
    this.brand = product.brand
    this.img = product.img
    this.cart_quantity = cart_quantity
    this.price_amount = product.price
    this.price = (() => {
      return this.currency.format(this.price_amount)
    })()
    this.total = (() => {
      return this.currency.format(this.price_amount * this.cart_quantity)
    })()
  }

  public get increase() {
    ++this.cart_quantity
    return this
  }

  public get decrease() {
    --this.cart_quantity
    return this
  }

  public set add(quantity: number) {
    this.cart_quantity += quantity
  }

  public refresh() {}

  public render() {
    return /* HTML */ `<div class="row no-gutters align-items-center">
      <div class="col-3">
        <span class="product-image media-middle">
          <img src="${this.img}" alt="${this.name}" class="img-fluid" />
          ></span
        >
      </div>
      <div class="col col-info">
        <div class="pb-1"></div>
        <div class="product-attributes text-muted pb-1">
          <div class="product-line-info">
            <span class="label font-weight-bold">SKU:</span>
            <span class="value">${this.sku}</span>
          </div>
        </div>
        <div class="product-attributes text-muted pb-1">
          <div class="product-line-info">
            <span class="label font-weight-bold">Marca:</span>
            <span class="value">${this.brand}</span>
          </div>
        </div>

        <div class="row align-items-center mt-2 no-gutters">
          <div class="col mr-2">
            <input
              class="cart-product-quantity form-control js-cart-line-product-quantity"
              data-product-id="${this.id_product}"
              type="number"
              value="${this.cart_quantity}"
              name="product-quantity-spin"
              min="1"
            />
          </div>
          <div class="col">
            <span class="text-muted">x</span> <span>${this.price}</span>
          </div>

          <div class="col col-auto">
            <a
              class="remove-from-cart"
              rel="nofollow"
              href="javascript:void(0)"
              data-id-product="${this.id_product}"
              title="Eliminar del carro"
            >
              <i class="fa fa-trash-o" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
    </div>`
  }
}
