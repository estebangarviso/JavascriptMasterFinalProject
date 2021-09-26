import { CurrencyInterface } from '@interfaces'
import Component from '@helpers/Component'
import Data from '@helpers/Data'

export default class Currency extends Component implements CurrencyInterface {
  public id_currency: number = 0
  public iso_lang: string = ''
  public label: string = ''
  public symbol: string = ''
  public position: string = ''
  public decimals: number = 0
  public value: number = 0
  private data: Data

  constructor(data: Data) {
    super()
    const currency = data.getCurrency()
    this.data = data
    this.id_currency = currency.id_currency
    this.iso_lang = currency.iso_lang
    this.label = currency.label
    this.symbol = currency.symbol
    this.position = currency.position
    this.decimals = currency.decimals
    this.value = currency.value
  }

  /**
   * Format amount to currency.
   * Thousand separator equals to dot for all spanish languages, others with comma.
   * Decimal separator equals to comma for all spanish languages, others with dot
   * @param {number} amount - Amount of price
   * @return {string} if result is undefined, null, NaN or false, resolve with toLocaleString
   */
  public format(amount: number): string {
    let result
    let parts = (amount + '').split('.'),
      integer = parts[0],
      decimal = parts[1],
      iso_code = this.iso_lang,
      position = this.position
    if (iso_code.substring(0, 2) === 'es') {
      result = integer.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    } else {
      result = `${integer.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ','
      )}<sup>${decimal.substring(0, this.decimals)}</sup>`
    }
    result = result || (+amount).toLocaleString(iso_code)
    if (position === 'left')
      return `<span class="price-symbol">${this.symbol}</span>${result}`
    else if (position === 'right')
      return `${result}<span class="price-symbol">${this.symbol}</span>`

    return result
  }

  private refresh() {
    const prices = document.querySelectorAll('.product-price, .regular-price')
    prices.forEach((price) => {
      let amount = price.getAttribute('content')
      if (amount) {
        price.innerHTML = this.format(+amount * this.value)
      }
    })
  }

  public render(): void {
    throw new Error('Method is not implemented')
  }

  public init(): void {
    this.updateById(this.id_currency)
  }
  /**
   * @desc Update currency by ID
   * @param {number} id_currency - Currency ID
   */
  public updateById(id_currency: number) {
    if (id_currency === this.id_currency) {
      this.refresh()
      return
    }
    const currency = this.data.getCurrencyById(id_currency)
    const element = document.getElementById('js-currency')
    if (currency && element) {
      localStorage.setItem('currency', JSON.stringify(currency))
      this.refresh()
      let event = new CustomEvent('updatedCurrency', {
        detail: { currency: currency },
      })
      element.addEventListener('change', (e) => e.target.dispatchEvent(event))
    }
  }
}
