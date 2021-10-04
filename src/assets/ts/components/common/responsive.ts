export default class Responsive {
  public static mobileSize: number = 768
  private isInitialized: boolean = false
  private isMobile: boolean
  public static get isMobileDevice() {
    return window.innerWidth < Responsive.mobileSize
  }
  constructor() {
    this.isMobile = window.innerWidth < Responsive.mobileSize
  }

  init() {
    if (!this.isInitialized) {
      this.stickyHeader()
      this.resizeWidth()
      this.windowResizeWidth()
      this.isInitialized = true
    }
  }

  /**
   * Listen window when resize width
   */
  private resizeWidth() {
    window.addEventListener('resize', this.windowResizeWidth.bind(this), false)
  }

  public windowResizeWidth() {
    const innerWidth = window.innerWidth

    if (innerWidth > Responsive.mobileSize && this.isMobile === true) {
      this.isMobile = false
      const responsiveEvent = new CustomEvent('responsive update', {
        detail: { isMobile: this.isMobile },
      })
      document.body.dispatchEvent(responsiveEvent)
    } else if (innerWidth <= Responsive.mobileSize && this.isMobile === false) {
      this.isMobile = true
      const responsiveEvent = new CustomEvent('responsive update', {
        detail: { isMobile: this.isMobile },
      })
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
    const mobileHeaderHeight = document.getElementById(
      'mobile-header-sticky'
    ).offsetHeight
    window.addEventListener('scroll', () => {
      // Desktop
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
      // Mobile
      if (window.pageYOffset > mobileHeaderHeight) {
        ;(
          document.querySelector(
            '#header .sticky-mobile-wrapper'
          ) as HTMLElement
        ).style.height = mobileHeaderHeight + 'px'
        document
          .getElementById('mobile-header-sticky')
          .classList.add('stuck-down')
      } else {
        document
          .getElementById('mobile-header-sticky')
          .classList.remove('stuck-down')
        ;(
          document.querySelector(
            '#header .sticky-mobile-wrapper'
          ) as HTMLElement
        ).style.removeProperty('height')
      }
    })
  }
}
