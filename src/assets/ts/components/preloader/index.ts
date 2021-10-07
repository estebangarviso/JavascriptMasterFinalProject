import { fadeOut } from '@components/common/animations'
import Component from '@helpers/Component'

export default class Preloader extends Component {
  public get element() {
    return document.getElementById('page-preloader')
  }
  init() {
    // When we begin, assume no images are loaded.
    let imagesLoaded = 0
    // Count the total number of images on the page when the page has loaded.
    const totalImages = document.querySelectorAll('img').length

    // After an image is loaded, add to the count, and if that count equals the
    // total number of images, fire the allImagesLoaded() function.
    document.querySelectorAll('img').forEach((img) =>
      img.addEventListener('load', () => {
        imagesLoaded++
        if (imagesLoaded === totalImages) {
          this.allImagesLoaded()
        }
      })
    )
  }
  public allImagesLoaded() {
    fadeOut(this.element, 2000, () => {
      this.element.remove()
    })
  }

  public render(): void {
    throw new Error('Method not implemented.')
  }
}
