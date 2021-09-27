import { CurrencyInterface } from '@interfaces'
import Component from '@helpers/Component'
import Data from '@helpers/Data'

export default class Currency extends Component implements CurrencyInterface {
  public id_currency: number
  public iso_lang: string
  public label: string
  public symbol: string
  public position: string
  public decimals: number
  public value: number
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

  private set currency(params: CurrencyInterface) {
    this.id_currency = params.id_currency
    this.iso_lang = params.iso_lang
    this.label = params.label
    this.symbol = params.symbol
    this.position = params.position
    this.decimals = params.decimals
    this.value = params.value
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
    amount = +parseFloat(amount + '').toFixed(this.decimals)

    let parts = (amount + '').split('.'),
      integer = parts[0],
      decimal = parts[1] ? String(parts[1]).padEnd(this.decimals, '0') : '',
      iso_code = this.iso_lang,
      position = this.position

    if (iso_code.substring(0, 2) === 'es') {
      result = integer.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    } else {
      result = `${integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}${
        decimal ? `<sup class="price-cents">${decimal}</sup>` : ''
      }`
    }
    result = result || (+amount).toLocaleString(iso_code)
    if (position === 'left')
      return `<span class="price-symbol">${this.symbol}</span>${result}`
    else if (position === 'right')
      return `${result}<span class="price-symbol">${this.symbol}</span>`

    return result
  }

  private refresh() {
    const prices = document.querySelectorAll('[data-price]')
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
    const element = document.getElementById('js-currency')
    this.updateById(this.id_currency)
    if (element) {
      const currency: CurrencyInterface = JSON.parse(
        localStorage.getItem('currency')
      )
      if (currency)
        (element as HTMLInputElement).value = currency.id_currency + ''

      element.addEventListener('change', (event) => {
        this.updateById(+(event.target as HTMLInputElement).value)
      })
    }
  }
  /**
   * @desc Update currency by ID
   * @param {number} id_currency - Currency ID
   */
  public updateById(id_currency: number) {
    const element = document.getElementById('js-currency')
    const currency = this.data.getCurrencyById(id_currency)
    if (currency && element) {
      localStorage.setItem('currency', JSON.stringify(currency))
      this.currency = currency
      this.refresh()
    }
  }
}
