/**
 * Components
 *
 * @interface
 */
export default interface ComponentInterface {
  get element(): HTMLElement
  set element(element: HTMLElement)
  init(): void
}

/**
 * Notifications
 *
 * @interface
 */
export interface NotificationInterface extends ComponentInterface {
  get error(): string
  get warning(): string
  get success(): string
  get info(): string
  set addError(notif: string)
  set addWarning(notif: string)
  set addSuccess(notif: string)
  set addInfo(notif: string)
}

/**
 * Form
 *
 * @interface
 */
export interface FormInterface {
  submit(event: Event): boolean

  get errors(): { name: string; error: string[] }[]

  hasErrors(): boolean

  render(): void
}

/**
 * Cart Product
 *
 * @interface
 */
export interface ShoppingcartProductInterface {
  id_product?: number
  name?: string
  sku?: string
  brand?: string
  img?: string
  cart_quantity?: number
  price_amount?: number
  price?: string
  total?: string
}
/**
 * Product
 *
 * @interface
 */
export interface ProductInterface {
  id_product: number
  sku: string
  brand: string
  name: string
  price_amount: number
  discount_amount?: number
  price: string
  regular_price?: string
  has_discount: boolean
  img: string
  stock: number
}
/**
 * Currency
 *
 * @interface
 */
export interface CurrencyInterface {
  id_currency: number
  iso_lang: string
  label: string
  symbol: string
  position: string
  decimals: number
  value: number
  format(amount: number): string
}
/**
 * Customer
 *
 * @interface
 */
export interface CustomerInterface {
  id_customer: number
  firstname: string
  lastname: string
  email: string
  password: string
}

/**
 * Carrier
 *
 * @interface
 */
export interface CarrierInterface {
  id_carrier: number
  fixed_price: number
  per_package: number
}
