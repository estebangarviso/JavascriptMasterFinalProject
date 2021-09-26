import {
  ProductInterface,
  CurrencyInterface,
  CarrierInterface,
  CustomerInterface,
} from '@interfaces'
import { AsyncFetchType } from '@types'

let products = fetchAsync<ProductInterface[]>('./json/products.json')
let currencies = fetchAsync<CurrencyInterface[]>('./json/currencies.json')
let carriers = fetchAsync<CarrierInterface[]>('./json/carriers.json')
let customers = fetchAsync<CustomerInterface[]>('./json/customers.json')

export { products, currencies, carriers, customers }

/**
 * Using Fetch
 * {@link <https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Using_Fetch>}
 * @contribuitor msmfsd
 * {@link <https://gist.github.com/msmfsd/fca50ab095b795eb39739e8c4357a808>}
 * @param {string} filename - JSON filename
 */
async function fetchAsync<T = AsyncFetchType>(filename: string): Promise<T> {
  const startTime = performance.now()
  //console.log(`Fetching: ${filename} - start`)
  let response
  try {
    // default init callback for request
    const init = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
    // fetch request instance
    const request = new Request(filename, init)
    // await response of fetch call
    response = await fetch(request)
    // only proceed once promise is resolved
    let data: T = await response.json()
    // only proceed once second promise is resolved
    if (data) {
      const endTime = performance.now()
      //console.log(`File ${filename} tooks ${endTime - startTime}ms`)
      return data
    } else throw new Error(`Error trying to get JSON data from ${filename}`)
  } catch (error) {
    console.error(error)
    response = error
  }
  throw new Error(JSON.stringify(response))
}
