import Component from '@helpers/Component'
import ShoppingcartProduct from './ShoppingcartProduct'
import { CartSubtotalsType, CartTotalType } from '@types'
import Data from '@helpers/Data'
import Currency from '@components/modules/currency'
import Carrier from '@components/common/carrier'
import { ProductInterface } from '@interfaces'
import Catalog from '@components/catalog'
import Notifications from '@components/common/notifications'

export default class Shoppingcart extends Component {
  public get component() {
    return document.getElementById('js-shopping-cart')
  }
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
  private _products_count: number = 0
  private set products_count(quantity: number) {
    this._products_count = quantity
  }
  public get products_count(): number {
    return this._products_count
  }
  public catalog: Catalog
  public notifications: Notifications
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

  constructor(data: {
    data: Data
    currency: Currency
    carrier: Carrier
    catalog: Catalog
    notifications: Notifications
  }) {
    super()
    this.data = data.data
    this.currency = data.currency
    this.carrier = data.carrier
    this.catalog = data.catalog
    this.notifications = data.notifications
  }

  private setQuantities() {
    if (this.hasProducts) {
      this.products_count = this.products.reduce(
        (accumulator, product) => product.cart_quantity + accumulator,
        0
      )
    }
  }

  private setSubtotals() {
    let products, shipping
    if (this.hasProducts) {
      let carrier = this.carrier
      products = (() => {
        let type = 'products',
          amount = this.products.reduce(
            (accumulator, product) =>
              product.price_amount !== undefined
                ? product.price_amount * product.cart_quantity + accumulator
                : 0,
            0
          ),
          label = 'Productos',
          value = this.currency.format(amount)
        return { type, amount, label, value }
      })()
      shipping = (() => {
        let type = 'shipping',
          amount =
            carrier.fixed_price +
            this.products.reduce((accumulator, product) => {
              return product.cart_quantity * carrier.per_package + accumulator
            }, 0),
          label = 'Envío',
          value = this.currency.format(amount)
        return { type, amount: amount, label: label, value: value }
      })()
      this.subtotals = [products, shipping]

      if (this.subtotals.length) {
        let type = 'total',
          amount = this.subtotals
            .map((subtotal) => +subtotal.amount)
            .reduce((amount, accumulator) => amount + accumulator, 0),
          label = 'Total',
          value = this.currency.format(amount)
        this.total = { type, amount, label, value }
      }
    }
  }

  public toggleCartQtyIcon() {
    const desktopCartQtyIcon = document.getElementById(
      'desktop-cart-products-count'
    )
    const mobileCartQtyIcon = document.getElementById(
      'mobile-cart-products-count'
    )
    if (this.hasProducts) {
      desktopCartQtyIcon.classList.remove('d-none')
      mobileCartQtyIcon.classList.remove('d-none')
    } else {
      desktopCartQtyIcon.classList.add('d-none')
      mobileCartQtyIcon.classList.add('d-none')
    }
  }

  public showCartContent() {
    const desktopToggle = document.getElementById('cart-toogle')
    const mobileToggle = document.getElementById('mobile-cart-toogle')
    const closeCartBtn = document.getElementById('js-cart-close')

    const handler = () => {
      const mobileBlockCart = document.getElementById('mobile-cart-wrapper')
      const desktopBlockCart = document.getElementById('blockcart')

      if (desktopBlockCart.querySelector('.blockcart-content')) {
        desktopBlockCart.classList.toggle('show')
        document
          .getElementById('_desktop_blockcart-content')
          .classList.toggle('show')
      }

      if (mobileBlockCart.querySelector('.blockcart-content')) {
        mobileBlockCart.classList.toggle('show')
        document
          .getElementById('_mobile_blockcart-content')
          .classList.toggle('show')
      }
    }

    if (closeCartBtn) closeCartBtn.addEventListener('click', handler)
    if (desktopToggle) desktopToggle.addEventListener('click', handler)
    if (mobileToggle) mobileToggle.addEventListener('click', handler)
  }

  public refresh() {
    const cartUpdatedEvent = new Event('cart updated')
    if (this.hasProducts)
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
    else localStorage.removeItem('cart_products')

    this.setQuantities()
    this.setSubtotals()
    this.render()
    document.body.dispatchEvent(cartUpdatedEvent)
  }

  public setConfirmationCart() {
    const btn = document.getElementById('shopping-cart-confirm-btn')
    const addToCartBtns = document.querySelectorAll(
      '.product-miniature .add-to-cart'
    )
    if (btn)
      btn.addEventListener('click', async () => {
        const promise = await new Promise((resolve) => {
          const cart_products = Data.getCartProducts()
          addToCartBtns.forEach((btn) => btn.setAttribute('disabled', ''))
          btn.classList.add('processing-purchase')
          return setTimeout(() => {
            resolve(cart_products)
          }, 3000)
        }).then((respose) => {
          // POST request to backend validations
          console.log(respose)
          this.notifications.addSuccess =
            '<i class="fas fa-check"></i> Gracias por su compra!😊'
          btn.classList.remove('processing-purchase')
          addToCartBtns.forEach((btn) => btn.removeAttribute('disabled'))
          // Remove all products from cart
          this.removeAll()
        })
      })
  }

  public setRemoveAllProducts() {
    {
      const btn = document.getElementById('shopping-cart-restore-btn')
      if (btn)
        btn.addEventListener('click', () => {
          this.products = []
          localStorage.removeItem('cart_products')
          this.refresh()
        })
    }
  }

  public setRemoveProduct() {
    const removeFromCart = document.querySelectorAll(`.remove-from-cart`)
    if (removeFromCart) {
      removeFromCart.forEach((remove) =>
        remove.addEventListener('click', (event: Event) => {
          const id_product = (event.currentTarget as HTMLElement).getAttribute(
            'data-id-product'
          )

          if (id_product) this.removeProduct(+id_product)
        })
      )
    }
  }

  public addProduct(id_product: number, quantity: number) {
    if (!this.isProductOutOfStock(id_product)) {
      let _product = this.data.getProductById(id_product)
      let product = new ShoppingcartProduct(this.currency, _product, quantity)
      if (this.hasProducts) {
        let cart_product = this.products.filter(
          (product) => product.id_product === id_product
        )[0]

        if (cart_product)
          cart_product.fix = cart_product.cart_quantity + quantity

        let rest_products = this.products.filter(
          (product) => product.id_product !== id_product
        )
        if (cart_product) this.products = [...rest_products, cart_product]
        else this.products = [...rest_products, product]
      } else {
        this.products.push(product)
      }
      this.updateStock(id_product, quantity, false)
      this.refresh()
    }
  }

  public increaseProduct(id_product: number) {
    if (!this.isProductOutOfStock(id_product)) {
      for (let product of this.products) {
        if (product.id_product === id_product) {
          product.increase
          continue
        }
      }
      this.updateStock(id_product, 1, false)
      this.refresh()
    }
  }

  public decreaseProduct(id_product: number) {
    if (!this.isProductOutOfStock(id_product)) {
      for (let product of this.products) {
        if (product.id_product === id_product) {
          product.decrease
          continue
        }
      }
      this.updateStock(id_product, 1, true)
      this.refresh()
    }
  }

  public removeProduct(id_product: number) {
    const product = this.products.filter(
      (product) => product.id_product === id_product
    )[0]
    if (product) {
      this.updateStock(product.id_product, product.cart_quantity, true)
      this.products = this.products.filter(
        (product) => product.id_product !== id_product
      )
      this.refresh()
    }
  }

  public removeAll() {
    this.products.forEach((cart_product) => {
      this.catalog.products.forEach((product) => {
        if (product.id_product === cart_product.id_product)
          this.updateStock(product.id_product, cart_product.cart_quantity, true)
      })
    })

    this.products = []
    this.refresh()
  }

  public init() {
    let cart_products = Data.getCartProducts()
    // Check if cart has products
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
      cart_products.map((product) =>
        this.updateStock(product.id_product, product.cart_quantity, false)
      )
    }
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
            this.addProduct(Number(id_product), Number(qty))
          },
          false
        )
      )
    this.render()

    this.setRemoveAllProducts()
    this.setConfirmationCart()
    this.setRemoveProduct()
    this.showCartContent()
    this.toggleCartQtyIcon()
    const desktopCartQtyIconText = document.getElementById(
      'desktop-cart-products-count'
    ).innerText
    document.getElementById('mobile-cart-products-count').innerText =
      desktopCartQtyIconText
    document.body.addEventListener('cart updated', () => {
      this.setRemoveAllProducts()
      this.setConfirmationCart()
      this.setRemoveProduct()
      this.showCartContent()
      this.toggleCartQtyIcon()
      const desktopCartQtyIconText = document.getElementById(
        'desktop-cart-products-count'
      ).innerText
      document.getElementById('mobile-cart-products-count').innerText =
        desktopCartQtyIconText
    })
  }

  private isProductOutOfStock(id_product: number): boolean {
    let isOut = false
    const catalog_product = this.catalog.products.filter(
      (product) => product.id_product === id_product
    )[0]
    const cart_product = this.products.filter(
      (product) => product.id_product === id_product
    )[0]
    isOut = catalog_product.stock === 0
    if (isOut)
      this.notifications.addError =
        '<i class="fas fa-ban"></i> El producto se encuentra fuera de stock'
    return isOut
  }

  /**
   * Sync stock Catalog with Cart Products
   * @param {number} id_product - Product ID
   * @param {number} quantity - Product quantity
   * @param {boolean} backtostock - If is true return back to stock, false to take from stock
   */
  private updateStock(
    id_product: number,
    quantity: number,
    backtostock: boolean
  ) {
    const cart_product = this.products.filter(
      (product) => product.id_product === id_product
    )[0]
    if (cart_product) {
      this.catalog.products.map((product) => {
        if (product.id_product === cart_product.id_product) {
          const cartUpdateEvent = new CustomEvent('cart update', {
            detail: { product, cart_product, add: backtostock },
          })
          if (backtostock === true) product.stock += quantity
          else product.stock -= quantity

          const miniature = document.querySelector(
            `.product-miniature[data-id-product="${id_product}"]`
          )
          if (miniature) {
            const miniatureStock = miniature.querySelector('.product-stock')
            const miniatureStatus = miniature.querySelector(
              '.product-availability'
            )
            miniatureStock.innerHTML = product.renderStock
            miniatureStatus.innerHTML = product.renderStatus
          }
          document.body.dispatchEvent(cartUpdateEvent)
        }
      })
    }
  }

  public render() {
    this.component.innerHTML = this.renderCart
    const mobileBlockCartContent = document.getElementById(
      '_mobile_blockcart-content'
    )
    if (mobileBlockCartContent) {
      mobileBlockCartContent.innerHTML = this.renderCartContent
    }
  }

  public get renderCart() {
    return /* HTML */ ` <div id="blockcart" class="blockcart cart-preview">
      <a
        id="cart-toogle"
        class="cart-toogle header-btn header-cart-btn"
        data-toggle="dropdown"
        data-display="static"
      >
        <i class="fas fa-shopping-cart fa-fw icon" aria-hidden="true"
          ><span
            id="desktop-cart-products-count"
            class="cart-products-count-btn${this.products_count < 1
              ? ` d-none`
              : ``}"
            >${this.products_count}</span
          ></i
        >
        <span class="info-wrapper">
          <span class="title">Carro</span>
          <span class="cart-toggle-details">
            <span class="text-faded cart-separator"> / </span>
            ${this.products_count > 0
              ? `<span class="cart-products-count">(${
                  this.products_count
                })</span>
            ${this.subtotals
              .map((subtotal) =>
                subtotal.type === 'products'
                  ? `<span class="value" data-price content="${subtotal.amount}">${subtotal.value}</span>`
                  : ``
              )
              .join('')}`
              : `No hay productos en su carro`}
          </span>
        </span>
      </a>
      ${this.renderCartContent}
    </div>`
  }
  private get hasProducts(): boolean {
    let isValid = true
    if (this.products.length === 0) isValid = false
    return isValid
  }
  private get renderCartContent() {
    return /* HTML */ `<div
      id="_desktop_blockcart-content"
      class="dropdown-menu-custom dropdown-menu"
    >
      <div id="blockcart-content" class="blockcart-content">
        <div class="cart-title">
          <span class="modal-title">Su carro</span>
          <button
            type="button"
            id="js-cart-close"
            class="btn-close float-end"
          ></button>
          <hr />
        </div>
        ${this.hasProducts
          ? /* HTML */ `${this.renderCartProducts} ${this.renderCartSubtotals}
              ${this.renderCartTotals}
              <div class="cart-buttons text-center">
                <a
                  href="javascript:void(0)"
                  id="shopping-cart-confirm-btn"
                  class="btn btn-primary w-100 btn-lg mb-2"
                >
                  <i
                    class="fas fa-circle-notch fa-spin fa-fw spinner-icon"
                    aria-hidden="true"
                  ></i
                  >Realizar compra</a
                >
                <a
                  href="javascript:void(0)"
                  id="shopping-cart-restore-btn"
                  class="btn btn-secondary w-100 btn-lg"
                >
                  Restaurar productos</a
                >
              </div> `
          : `<span class="no-items">No hay más productos en su carro</span>`}
      </div>
    </div>`
  }
  private get renderCartProducts() {
    if (this.hasProducts) {
      return /* HTML */ `<ul class="cart-products">
        ${this.products
          .map((product) => `<li>${product.render()}</li>`)
          .join('')}
      </ul> `
    } else return ''
  }

  private get renderCartSubtotals() {
    return /* HTML */ `<div class="cart-subtotals">
      ${this.subtotals
        .map(
          (subtotal) => /* HTML */ `<div
            class="cart-summary-line"
            id="cart-subtotal-${subtotal.type}"
          >
            <span class="label">${subtotal.label}</span>
            <span
              class="value float-end"
              data-price
              content="${subtotal.amount}"
              >${subtotal.value}</span
            >
          </div>`
        )
        .join('')}
    </div>`
  }

  private get renderCartTotals() {
    return /* HTML */ `<div class="cart-totals">
      <div class="clearfix">
        <span class="label">${this.total.label}</span>
        <span class="value float-end" data-price content="${this.total.amount}"
          >${this.total.value}</span
        >
      </div>
    </div>`
  }
}
