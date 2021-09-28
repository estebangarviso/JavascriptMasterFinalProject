export class Responsive {
  private _isMobile: boolean
  public get isMobile() {
    return this._isMobile
  }
  private set isMobile(value: boolean) {
    this._isMobile = value
  }
  private _mobileSize: number = 768
  public get mobileSize() {
    return this._mobileSize
  }
  public get handler() {
    return (event: Event) => {
      const fragment = document.createDocumentFragment()
      const blockcartContent = document.getElementById('blockcart-content')

      // Move components to mobile
      if (this.isMobile) {
        fragment.appendChild(blockcartContent)
        document
          .getElementById('_mobile_blockcart-content')
          .appendChild(fragment)
      } else {
        fragment.appendChild(blockcartContent)
        document
          .getElementById('_desktop_blockcart-content')
          .appendChild(fragment)
      }
    }
  }
  init() {
    this.stickyHeader()
    this.resizeWidth()
    this.handler
  }

  /**
   * Listen window when scroll up
   */
  private scrollUp() {}
  /**
   * Listen window when resize width
   */
  private resizeWidth() {
    const body = document.body
    body.addEventListener('responsive update', this.handler, false)
    window.addEventListener('resize', (event: Event) => {
      const responsiveEvent = new Event('responsive update')
      const innerWidth = (event.target as Window).innerWidth
      if (innerWidth > this.mobileSize && this.isMobile) {
        this.isMobile = false
        body.dispatchEvent(responsiveEvent)
      } else if (innerWidth <= this.mobileSize && !this.isMobile) {
        this.isMobile = true
        body.dispatchEvent(responsiveEvent)
      }
    })
  }
  /**
   * Sticky header when going down go down the scroll
   */
  private stickyHeader() {
    const desktopHeaderHeight = document.getElementById(
      'desktop-header-container'
    ).offsetHeight
    window.addEventListener('scroll', (event: Event) => {
      if (window.pageYOffset > desktopHeaderHeight) {
        ;(
          document.querySelector(
            '#header .sticky-desktop-wrapper'
          ) as HTMLElement
        ).style.height = desktopHeaderHeight + 'px'
        document.getElementById('desktop-header').classList.add('stuck-header')
      } else {
        document
          .getElementById('desktop-header')
          .classList.remove('stuck-header')
        ;(
          document.querySelector(
            '#header .sticky-desktop-wrapper'
          ) as HTMLElement
        ).style.removeProperty('height')
      }
    })
  }
}
