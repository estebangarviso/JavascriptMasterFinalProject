import Component from '@helpers/Component'
import ProductMiniature from '@components/catalog/ProductMiniature'
import { ProductInterface } from '@interfaces'

export default class Catalog extends Component {
  public products: ProductMiniature[]

  constructor(products: ProductInterface[]) {
    super()
    this.products = products.map((product) => new ProductMiniature(product))
  }
  public init() {
    this.render()
  }
  public render() {
    const component = document.getElementById('js-products')
    component.innerHTML = this.renderProductList
  }
  public sort(type: string, way: 'asc' | 'des') {
    let products = this.products
    switch (type) {
      case 'price':
        break
      case 'stock':
        break
      case 'name':
        break
      default:
        throw new Error(
          `Wrong sort product list. Tried to sort by ${type} and type ${way}`
        )
    }
  }

  private get renderProductList() {
    return /* HTML */ `<div class="products row products-grid">
      ${this.products
        .map((product) => {
          return product.render()
        })
        .join('')}
    </div>`
  }
}
