import { products, currencies, carriers, customers } from '@helpers/Promises'
import Shoppingcart from '@components/shoppingcart'
import AuthenticationForm from '@components/authentication'
import Notifications from '@components/notifications'
import Catalog from '@components/catalog'
import Currency from '@components/modules/currency'
import Data from '@helpers/Data'
import Touchspin from '@components/common/touchspin'
import Carrier from '@components/common/carrier'
import Responsive from '@components/common/responsive'
import Preloader from '@components/preloader'

document.addEventListener('DOMContentLoaded', async function () {
  // Declaring components in DOM
  const DOMComponents = {
    catalog: document.getElementById('js-product'),
    cart: document.getElementById('js-shopping-cart'),
    cartWrapper: document.getElementById('shopping-cart-wrapper'),
    restoreStockBtn: document.getElementById('restore-catalog-stock'),
  }

  // Load Data
  const data = new Data({
    products: await products,
    currencies: await currencies,
    customers: await customers,
    carriers: await carriers,
  })

  // Declaring components
  const notifications = new Notifications()
  const currency = new Currency(data)
  const carrier = new Carrier(data.getCarrier()) /* There's just one carrier */
  const catalog = new Catalog({ products: data.products, currency })
  const cart = new Shoppingcart({
    data,
    currency,
    carrier,
    catalog,
    notifications,
  })
  const authentication = new AuthenticationForm(data)
  const responsive = new Responsive()
  const preloader = new Preloader()

  // Initializing components
  // Authentication Form
  authentication.init()
  // Notifications
  notifications.init()
  // Catalog
  catalog.init()
  // Shoppingcart
  cart.init()
  // Currency
  currency.init()
  // Responsive
  responsive.init()
  // Preloader
  preloader.init()

  // Adding static functionatities
  // Add Welcome Notification
  notifications.addInfo = '✨Bienvenido!'
  // Add Spinner to products input[type=number]
  document
    .querySelectorAll('.product-miniature')
    .forEach(
      (product) =>
        new Touchspin(
          product.querySelector('.input-group-add-cart'),
          '.input-qty',
          '<i class="fas fa-minus touchspin-down"></i>',
          '<i class="fas fa-plus touchspin-up"></i>'
        )
    )
  // Check if customer is logged
  const isLogged = JSON.parse(localStorage.getItem('isLogged'))
  // Hide cart if customer is not logged
  if (!isLogged) DOMComponents.cartWrapper.classList.add('d-none')
  // Enable add to cart buttons if customer is logged
  const addToCartBtns = document.querySelectorAll(
    '.product-add-cart .add-to-cart'
  )
  if (addToCartBtns && isLogged)
    addToCartBtns.forEach((btn) => btn.removeAttribute('disabled'))
  // Refresh Stocks Button
  DOMComponents.restoreStockBtn.addEventListener('click', (event) => {
    localStorage.removeItem('last_purchases')
    window.location.reload()
  })
})
