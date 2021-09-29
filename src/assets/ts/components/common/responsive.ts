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
  private _overHeaderHeight: boolean
  public get overHeaderHeight() {
    return this._overHeaderHeight
  }
  private set overHeaderHeight(value: boolean) {
    this._overHeaderHeight = value
  }
  public appendBlockcart() {
    const blockcartContent = document.getElementById('blockcart-content')

    // Move components to mobile
    if (this.isMobile) {
      document
        .getElementById('_mobile_blockcart-content')
        .appendChild(blockcartContent)
    } else {
      document
        .getElementById('_desktop_blockcart-content')
        .appendChild(blockcartContent)
    }
  }
  init() {
    if (!this.isInitialized) {
      this.stickyHeader()
      this.resizeWidth()
      this.windowResizeWidth()
      this.appendBlockcart()
      this.isInitialized = true
    }
  }

  /**
   * Listen window when resize width
   */
  private resizeWidth() {
    document.body.addEventListener(
      'responsive update',
      this.appendBlockcart,
      false
    )
    window.addEventListener('resize', this.windowResizeWidth, false)
  }

  private windowResizeWidth() {
    const innerWidth = window.innerWidth
    if (innerWidth > this.mobileSize && this.isMobile) {
      this.isMobile = false
      const responsiveEvent = new CustomEvent('responsive update', {
        detail: { isMobile: this.isMobile },
      })
      document.body.dispatchEvent(responsiveEvent)
    } else if (innerWidth <= this.mobileSize && !this.isMobile) {
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
