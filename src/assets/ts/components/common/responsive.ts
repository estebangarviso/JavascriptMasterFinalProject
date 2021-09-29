export class Responsive {
  private isInitialized: boolean = false
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
  public get updateHandler() {
    return () => {
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
    if (!this.isInitialized) {
      this.stickyHeader()
      this.resizeWidth()
      this.windowResizeWidth()
      this.updateHandler()
      this.isInitialized = true
    }
  }

  /**
   * Listen window when scroll up
   */
  private scrollUp() {}
  /**
   * Listen window when resize width
   */
  private resizeWidth() {
    document.body.addEventListener(
      'responsive update',
      this.updateHandler,
      false
    )
    window.addEventListener('resize', this.windowResizeWidth, false)
  }

  private windowResizeWidth() {
    const responsiveEvent = new Event('responsive update')
    const innerWidth = window.innerWidth
    if (innerWidth > this.mobileSize && this.isMobile) {
      this.isMobile = false
      document.body.dispatchEvent(responsiveEvent)
    } else if (innerWidth <= this.mobileSize && !this.isMobile) {
      this.isMobile = true
      document.body.dispatchEvent(responsiveEvent)
    }
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
