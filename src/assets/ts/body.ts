import { products, currencies, carriers, customers } from '@helpers/Promises'
import Shoppingcart from '@components/shoppingcart'
import AuthenticationForm from '@components/authentication'
// import Notifications from '@components/common/notifications'
import Catalog from '@components/catalog'
import Currency from '@components/common/currency'
import Data from '@helpers/Data'
import { fadeOut } from '@components/common/preloader'
import Touchspin from '@components/common/touchspin'
import Carrier from '@components/common/carrier'

document.addEventListener('DOMContentLoaded', async function () {
  // Declaring components in DOM
  const DOMComponents = {
    preloader: document.getElementById('page-preloader'),
    catalog: document.getElementById('js-product'),
    cart: document.getElementById('js-shopping-cart'),
    cartWrapper: document.getElementById('shopping-cart-wrapper'),
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
  const carrier = new Carrier(data.getCarrier()) /* There's just one carrier */
  const catalog = new Catalog(data.products)
  const cart = new Shoppingcart({ data, currency, carrier })
  const authentication = new AuthenticationForm(data)

  // Initializing components
  // Catalog
  catalog.init()
  let productMiniatures = document.querySelectorAll('.product-miniature')
  // Shoppingcart
  cart.init()
  // Currency
  currency.init()
  // Authentication Form
  authentication.init()

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
  // Check if customer is logged
  let isLogged = JSON.parse(localStorage.getItem('isLogged'))
  // Hide cart if customer is not logged
  if (!isLogged) DOMComponents.cartWrapper.classList.add('d-none')
})
