import {
  CarrierInterface,
  CurrencyInterface,
  CustomerInterface,
  ProductInterface,
} from '@interfaces'
import config from 'app/config.defaults.json'
/**
 * @class
 * Use to manage all Javascript Object Notation (JSON) data
 */
export default class Data {
  static getProductById(id_product: number): ProductInterface | undefined {
    throw new Error('Method not implemented.')
  }
  private readonly defaults = {
    id_currency: config.id_currency,
    id_customer: config.id_customer,
    id_carrier: config.id_carrier,
  }
  products: ProductInterface[]
  currencies: CurrencyInterface[]
  customers: CustomerInterface[]
  carriers: CarrierInterface[]

  constructor(params: {
    products: ProductInterface[]
    currencies: CurrencyInterface[]
    customers: CustomerInterface[]
    carriers: CarrierInterface[]
  }) {
    this.products = params.products
    this.currencies = params.currencies
    this.customers = params.customers
    this.carriers = params.carriers
  }
  /**
   * Init data on localStorage
   */
  // async init() {
  //   const currency = await Data.getCurrency()
  //   const cart_products = Data.getCartProducts()
  //   localStorage.setItem('currency', currency)
  //   localStorage.setItem('cart_products', JSON.stringify(cart_products))
  // }

  /**
   * Select a product
   * @param {string | number} id_product - Product ID
   */
  public getProductById(id_product: string | number) {
    let response = this.products.filter(function (product) {
      return product.id_product == id_product
    })[0]
    if (!response)
      throw new Error(`Product ID equal to ${id_product} not found`)
    return response
  }

  /**
   * Select a currency
   * @param {string | number} id_currency - Currency ID
   */
  public getCurrencyById(id_currency: number | string) {
    let response = this.currencies.filter(
      (currency: { id_currency: number }) => {
        return currency.id_currency == id_currency
      }
    )[0]

    if (!response)
      throw new Error(`Currency ID equal to ${id_currency} not found`)
    return response
  }

  /**
   * Select a customer
   * @param {string} email - Customer email
   */
  public getCustomerByEmail(email: string) {
    let response = this.customers.filter((customer) => {
      return customer.email === email
    })[0]

    if (!response) throw new Error(`Customer email equal to ${email} not found`)
    return response
  }

  /**
   * Select one carrier inside JSON to Object by ID
   * @param {string | number} id_carrier - Carrier ID
   */
  public getCarrierById(id_carrier: string | number) {
    let response = this.carriers.filter((carrier) => {
      return (
        carrier.id_carrier === id_carrier || carrier.id_carrier === +id_carrier
      )
    })[0]
    if (!response)
      throw new Error(`Carrier ID equal to ${id_carrier} not found`)
    return response
  }

  /**
   * Get current currency or default currency
   */
  public getCurrency(): CurrencyInterface {
    const currency = localStorage.getItem('currency')
    if (currency === null)
      return this.currencies.filter(
        (currency) => currency.id_currency === this.defaults.id_currency
      )[0]
    else return JSON.parse(currency)
  }

  /**
   * Get carrier default carrier
   */
  public getCarrier() {
    return this.carriers.filter(
      (carrier) => carrier.id_carrier === this.defaults.id_carrier
    )[0]
  }

  /**
   * Get current products inside cart or empty array
   */
  public static getCartProducts():
    | { id_product: number; cart_quantity: number }[]
    | [] {
    const cart_products: string | null = localStorage.getItem('cart_products')

    if (cart_products === null) return []
    else return JSON.parse(cart_products)
  }

  /**
   * Truncate string and add ... at the end if exceed num parameter
   * @param {string} str - string to truncate
   * @param {number} num - number of characters to check
   */
  public static truncateString(str: string, num: number) {
    if (str.length > num) {
      return str.slice(0, num) + '...'
    } else {
      return str
    }
  }
}
