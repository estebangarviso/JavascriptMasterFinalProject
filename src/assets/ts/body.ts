import { products, currencies, carriers, customers } from '@helpers/Promises'
// import Shoppingcart from '@components/shoppingcart'
// import AuthenticationForm from '@components/authentication'
// import Notifications from '@components/common/notifications'
import Catalog from '@components/catalog'
import Currency from '@components/common/currency'
import Data from '@helpers/Data'
import { fadeOut } from '@components/common/preloader'
import Touchspin from '@components/common/touchspin'

/**
 * Fetch Currency and Carrier before everything
 */

//   carrier: (async () => await Data.getCarrier())(),
//   cart: new Shoppingcart(),
//   catalog: new Catalog(),
//   authentication: new AuthenticationForm(),
//   notifications: new Notifications(),

document.addEventListener('DOMContentLoaded', async function () {
  // Declaring components in DOM
  const DOMComponents = {
    preloader: document.getElementById('page-preloader'),
    catalog: document.getElementById('js-product'),
  }

  // Preloader
  fadeOut(DOMComponents.preloader, 2000, function () {
    DOMComponents.preloader.remove()
  })

  // Load Data
  const data = new Data({
    products: await products,
    currencies: await currencies,
    customers: await customers,
    carriers: await carriers,
  })

  // Declaring components
  const currency = new Currency(data)
  const catalog = new Catalog(data.products)

  // Initializing components
  catalog.init()
  let productMiniatures = document.querySelectorAll('.product-miniature')
  currency.init()

  // Add Spinner to products input[type=number]
  productMiniatures.forEach(
    (product) =>
      new Touchspin(
        product.querySelector('.input-group-add-cart'),
        '.input-qty',
        '<i class="fas fa-minus touchspin-down"></i>',
        '<i class="fas fa-plus touchspin-up"></i>'
      )
  )
  // Adding functionatities
})
