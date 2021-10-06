import Component from '@helpers/Component'
import ShoppingcartProduct from './ShoppingcartProduct'
import { CartSubtotalsType, CartTotalType } from '@types'
import Data from '@helpers/Data'
import Currency from '@components/modules/currency'
import Carrier from '@components/common/carrier'
import { ProductInterface } from '@interfaces'
import Catalog from '@components/catalog'
import Notifications from '@components/notifications'
import Responsive from '@components/common/responsive'

export default class Shoppingcart extends Component {
  public get component() {
    return document.getElementById('js-shopping-cart')
  }
  private initialized: boolean = false
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

  public setVisibilityCartQtyIcon() {
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

    if (mobileCartQtyIcon)
      mobileCartQtyIcon.innerText = this.products_count + ''
    if (desktopCartQtyIcon)
      desktopCartQtyIcon.innerText = this.products_count + ''
  }
  public appendBlockcart() {
    const handler = (isMobile = Responsive.isMobileDevice) => {
      const blockcartContent = document.getElementById('blockcart-content')
      const fragment = document.createDocumentFragment()

      if (isMobile) {
        if (blockcartContent) fragment.appendChild(blockcartContent)
        document
          .getElementById('_mobile_blockcart-content')
          .appendChild(fragment)
      } else {
        if (blockcartContent) fragment.appendChild(blockcartContent)
        document
          .getElementById('_desktop_blockcart-content')
          .appendChild(fragment)
      }
    }
    handler()
    // Move black cart content from mobile/desktop to desktop/mobile
    document.body.addEventListener(
      'responsive update',
      (event: CustomEventInit) => handler(event.detail.isMobile),
      false
    )
  }

  public setShowCartContent() {
    const desktopToggle = document.getElementById('cart-toogle')
    const mobileToggle = document.getElementById('mobile-cart-toogle')
    const closeCartBtn = document.getElementById('js-cart-close')

    // Toggel in this case doens't work because it blockcart content move by events
    const handler = () => {
      const mobileBlockCart = document.getElementById('mobile-cart-wrapper')
      const desktopBlockCart = document.getElementById('blockcart')
      const desktopBlockcartContent = document.getElementById(
        '_desktop_blockcart-content'
      )
      const mobileBlockcartContent = document.getElementById(
        '_mobile_blockcart-content'
      )

      if (desktopBlockcartContent.classList.contains('show')) {
        desktopBlockCart.classList.remove('show')
        document
          .getElementById('_desktop_blockcart-content')
          .classList.remove('show')
      } else {
        desktopBlockCart.classList.add('show')
        document
          .getElementById('_desktop_blockcart-content')
          .classList.add('show')
      }

      if (mobileBlockcartContent.classList.contains('show')) {
        mobileBlockCart.classList.remove('show')
        document
          .getElementById('_mobile_blockcart-content')
          .classList.remove('show')
      } else {
        mobileBlockCart.classList.add('show')
        document
          .getElementById('_mobile_blockcart-content')
          .classList.add('show')
      }
    }

    if (closeCartBtn)
      closeCartBtn.addEventListener('click', handler.bind(this), false)
    if (!this.initialized) {
      if (desktopToggle)
        desktopToggle.addEventListener('click', handler.bind(this), false)

      if (mobileToggle)
        mobileToggle.addEventListener('click', handler.bind(this), false)
    }
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
    //this.render()
    document.body.dispatchEvent(cartUpdatedEvent)
  }

  public setConfirmationCart() {
    const btn = document.getElementById('shopping-cart-confirm-btn')
    const addToCartBtns = document.querySelectorAll(
      '.product-miniature .add-to-cart'
    )
    if (btn)
      btn.addEventListener('click', async () => {
        await new Promise((resolve) => {
          const cart_products = Data.getCartProducts()

          addToCartBtns.forEach((btn) => btn.setAttribute('disabled', ''))
          btn.classList.add('processing-purchase')

          return setTimeout(() => {
            resolve(cart_products)
          }, 3000)
        }).then((response) => {
          // Buy all products from cart
          let last_purchases = JSON.parse(
            localStorage.getItem('last_purchases')
          )
          const first_purchase = !last_purchases ? true : false
          // Set unique product ids
          let uniqueIds = new Set()
          const result: { id_product: number; stock_taken: number }[] = []

          response = (
            response as { id_product: number; cart_quantity: number }[]
          ).map((product) => ({
            id_product: product.id_product,
            stock_taken: product.cart_quantity,
          }))
          // Disorder
          last_purchases = [
            ...(response as { id_product: number; stock_taken: number }[]),
            ...(last_purchases
              ? (last_purchases as {
                  id_product: number
                  stock_taken: number
                }[])
              : []),
          ]
          if (!first_purchase) {
            ;(
              last_purchases as { id_product: number; stock_taken: number }[]
            ).map((last_purchase) => uniqueIds.add(last_purchase.id_product))
            // Merge product taken in unique product id
            Array.from(uniqueIds).forEach((id_product) => {
              const stock_taken = (
                last_purchases as {
                  id_product: number
                  stock_taken: number
                }[]
              ).reduce(
                (accumulator, last_purchase) =>
                  last_purchase.id_product === id_product
                    ? accumulator + last_purchase.stock_taken
                    : accumulator,
                0
              )

              result.push({
                id_product: id_product as number,
                stock_taken: stock_taken,
              })
            })
          }

          localStorage.setItem(
            'last_purchases',
            JSON.stringify(first_purchase ? last_purchases : result)
          )
          this.products = []
          this.refresh()

          this.notifications.addSuccess =
            '<i class="fas fa-check"></i> Gracias por su compra!😊'
          btn.classList.remove('processing-purchase')
          addToCartBtns.forEach((btn) => btn.removeAttribute('disabled'))
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
    this.appendBlockcart()
    this.setShowCartContent()
    this.setRemoveAllProducts()
    this.setConfirmationCart()
    this.setRemoveProduct()
    this.setVisibilityCartQtyIcon()

    document.body.addEventListener('cart updated', () => {
      // Before setting functionalities
      const cartInfo = document.getElementById('cart-info')
      const blockcartContent = document.getElementById('blockcart-content')

      if (cartInfo) cartInfo.innerHTML = this.renderCartInfo
      if (blockcartContent) blockcartContent.innerHTML = this.renderCartContent

      // Setting functionalities
      this.setShowCartContent()
      this.setRemoveAllProducts()
      this.setConfirmationCart()
      this.setRemoveProduct()
      this.setVisibilityCartQtyIcon()
    })
    this.initialized = true
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

  private get hasProducts(): boolean {
    let isValid = true
    if (this.products.length === 0) isValid = false
    return isValid
  }

  public render() {
    this.component.innerHTML = this.renderCart
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
            <div id="blockcart-info">${this.renderCartInfo}</div>
          </span>
        </span>
      </a>
      <div
        id="_desktop_blockcart-content"
        class="dropdown-menu-custom dropdown-menu"
      >
        <div id="blockcart-content" class="blockcart-content">
          ${this.renderCartContent}
        </div>
      </div>
    </div>`
  }
  private get renderCartInfo() {
    let result = ''
    if (this.hasProducts) {
      result = /* HTML */ `<span class="cart-products-count"
          >(${this.products_count})</span
        >
        ${this.subtotals
          .map((subtotal) =>
            subtotal.type === 'products'
              ? `<span class="value" data-price content="${subtotal.amount}">${subtotal.value}</span>`
              : ``
          )
          .join('')}`
    } else {
      result = /* HTML */ `No hay productos en su carro`
    }

    return result
  }
  private get renderCartContent() {
    return /* HTML */ ` <div class="cart-title">
        <span class="modal-title">Su carro</span>
        <button
          type="button"
          id="js-cart-close"
          class="btn-close float-end"
        ></button>
        <hr />
      </div>
      ${this.hasProducts
        ? /* HTML */ `<ul class="cart-products">
              ${this.renderCartProducts}
            </ul>
            <div class="cart-subtotals">${this.renderCartSubtotals}</div>
            <div class="cart-totals">${this.renderCartTotals}</div>
            <div class="cart-buttons text-center">
              <a
                href="javascript:void(0)"
                id="shopping-cart-confirm-btn"
                class="btn btn-primary w-100 btn-lg mb-2"
              >
                <i class="fab fa-paypal fa-fw" aria-hidden="true"></i>
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
        : `<span class="no-items">No hay más productos en su carro</span>`}`
  }
  private get renderCartProducts() {
    if (this.hasProducts) {
      return /* HTML */ `
        ${this.products
          .map((product) => `<li>${product.render()}</li>`)
          .join('')}
      `
    } else return ''
  }

  private get renderCartSubtotals() {
    return /* HTML */ `
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
    `
  }

  private get renderCartTotals() {
    return /* HTML */ ` <div class="clearfix">
      <span class="label">${this.total.label}</span>
      <span class="value float-end" data-price content="${this.total.amount}"
        >${this.total.value}</span
      >
    </div>`
  }
}
