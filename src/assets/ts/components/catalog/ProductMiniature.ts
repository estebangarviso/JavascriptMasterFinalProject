import Component from '@helpers/Component'
import Data from '@helpers/Data'
import { CurrencyInterface, ProductInterface } from '@interfaces'

export default class ProductMiniature
  extends Component
  implements ProductInterface
{
  private LAST_REMAINING_QTY = 2
  public id_product: number
  public sku: string
  public brand: string
  public name: string
  public price_amount: number
  public discount_amount?: number
  public has_discount: boolean
  public img: string
  public stock: number
  public price: string
  public regular_price?: string
  public availability: string
  public availability_message: string
  private currency: CurrencyInterface
  constructor(product: ProductInterface, currency: CurrencyInterface) {
    super()
    this.currency = currency
    this.id_product = product.id_product
    this.sku = product.sku
    this.brand = product.brand
    this.name = product.name
    this.price_amount = product.price_amount
    this.discount_amount = product.discount_amount
    if (
      typeof product.discount_amount !== undefined &&
      product.discount_amount > 0 &&
      product.discount_amount < product.price_amount
    ) {
      this.has_discount = true
      this.discount_amount = product.discount_amount
      this.regular_price = (() => {
        return this.currency.format(product.price_amount)
      })()
      this.price_amount = product.price_amount - product.discount_amount
    }
    this.price = (() => {
      return this.currency.format(this.price_amount)
    })()
    this.img = product.img
    // Check if customer past purchases
    let stock = product.stock
    const last_purchases = Data.getLastPurchases()
    if (last_purchases.length)
      last_purchases.forEach((last_purchase) => {
        if (this.id_product === last_purchase.id_product)
          stock = stock - last_purchase.stock_taken
      })
    this.stock = stock
    this.updateStatusMessages()
  }
  public updateStatusMessages() {
    if (this.stock <= 0) {
      this.availability = 'unavailable'
      this.availability_message = 'Agotado'
    } else if (this.stock <= this.LAST_REMAINING_QTY) {
      this.availability = 'last_remaining_items'
      this.availability_message = '??ltimos productos'
    } else if (this.stock > this.LAST_REMAINING_QTY) {
      this.availability = 'available'
      this.availability_message = 'Disponible para pedido'
    } else {
      this.stock = 0
      this.availability = 'unavailable'
      this.availability_message = 'Agotado'
    }
  }

  public init(): void {
    throw new Error('Method not implemented.')
  }

  public render() {
    return /* HTML */ `<div
      class="js-product-miniature-wrapper col-12 col-md-4 col-lg-4 col-xl-4"
    >
      <article
        class="product-miniature product-miniature-default product-miniature-grid js-product-miniature"
        data-id-product="${this.id_product}"
      >
        <div class="thumbnail-container">
          <div class="thumbnail product-thumbnail">
            <img
              data-src="${this.img}"
              src="${this.img}"
              alt="${this.truncateString(this.name, 30)}"
              width="236"
              height="305"
              class="img-fluid product-thumbnail-first"
            />
          </div>
          <div class="product-availability d-block">${this.renderStatus}</div>
        </div>
        <div class="product-description">
          <div class="row extra-small-gutters justify-content-end">
            <div class="col">
              <div class="product-brand text-muted">${this.brand}</div>
              <h4 class="h4 product-title">${this.name}</h4>
              <div class="product-reference text-muted">
                <strong>SKU</strong>: ${this.sku}
              </div>
              <div class="product-price-and-shipping">
                <p class="product-stock text-muted" data-stock="${this.stock}">
                  ${this.renderStock}
                </p>
                <span
                  class="product-price"
                  data-price
                  content="${this.price_amount}"
                  >${this.price}</span
                >${this.has_discount
                  ? `<span class="regular-price text-muted" data-price content="${
                      this.price_amount + this.discount_amount
                    }">${this.regular_price}</span>`
                  : ``}
              </div>
              <div class="product-add-cart">
                <div class="input-group-add-cart">
                  <input
                    type="number"
                    class="input-qty"
                    name="qty"
                    value="1"
                    min="1"
                  />
                </div>
                <button
                  class="btn btn-secondary btn-product-list add-to-cart"
                  data-button-action="add-to-cart"
                  type="submit"
                  disabled
                >
                  <i class="fas fa-shopping-cart fa-fw" aria-hidden="true"></i>
                  A??adir al carro
                </button>
              </div>
            </div>
          </div>
        </div>
        <span
          itemprop="isRelatedTo"
          itemscope
          itemtype="https://schema.org/Product"
        >
          <meta itemprop="image" content="${this.img}" />
          <meta itemprop="name" content="${this.name}" />
          <span itemprop="offers" itemscope itemtype="https://schema.org/Offer">
            <meta itemprop="price" content="${this.price_amount}" />
          </span>
        </span>
      </article>
    </div>`
  }
  public get renderStatus() {
    this.updateStatusMessages()
    return /* HTML */ `<span
      class="badge ${this.stock <= 0
        ? 'bg-danger product-unavailable'
        : 'bg-success product-available'} ${this.stock > 0 &&
      this.availability === 'last_remaining_items'
        ? 'bg-warning product-last-items'
        : ''} mt-2"
    >
      ${this.availability === 'available'
        ? `<i class="fas fa-check rtl-no-flip" aria-hidden="true"></i> ${this.availability_message}`
        : this.availability === 'last_remaining_items'
        ? `<i class="fas fa-exclamation" aria-hidden="true"></i> ${this.availability_message}`
        : `<i class="fas fa-ban" aria-hidden="true"></i> ${this.availability_message}`}
    </span>`
  }
  public get renderStock() {
    return /* HTML */ `${this.stock ? `${this.stock} unidades en stock` : ''}`
  }
}
