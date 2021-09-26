import Component from '@helpers/Component'
import { ProductInterface } from '@interfaces'

export default class ProductMiniature
  extends Component
  implements ProductInterface
{
  id_product: number
  sku: string
  brand: string
  name: string
  price: number
  discount_amount?: number
  img: string
  stock: number
  availability: string
  availability_message: string
  constructor(product: ProductInterface) {
    super()
    this.id_product = product.id_product
    this.sku = product.sku
    this.brand = product.brand
    this.name = product.name
    this.price = product.price
    this.discount_amount = product.discount_amount
    this.img = product.img
    this.stock = product.stock
    if (this.stock <= 0) {
      this.availability = 'unavailable'
      this.availability_message = 'Agotado'
    } else if (this.stock <= 2) {
      this.availability = 'last_remaining_items'
      this.availability_message = 'Últimos productos'
    } else if (this.stock > 2) {
      this.availability = 'available'
      this.availability_message = 'Disponible para pedido'
    } else {
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
          <div class="product-availability d-block">
            <span
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
            </span>
          </div>
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
                <span class="product-price" content="${this.price}"></span>
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
                  Añadir al carro
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
            <meta itemprop="price" content="${this.price}" />
          </span>
        </span>
      </article>
    </div>`
  }
}
