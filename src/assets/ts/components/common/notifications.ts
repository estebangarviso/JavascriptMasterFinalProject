import { NotificationInterface } from '@interfaces'
import Component from '@helpers/Component'
import { fadeOut } from './preloader'

export default class Notifications
  extends Component
  implements NotificationInterface
{
  public get component() {
    return document.getElementById('js-notifications')
  }
  private _error: string
  private _warning: string
  private _success: string
  private _info: string

  get error() {
    return this._error
  }
  get warning() {
    return this._warning
  }
  get success() {
    return this._success
  }
  get info() {
    return this._info
  }

  set addError(notif: string) {
    this._error = notif
    this.refresh()
  }
  set addWarning(notif: string) {
    this._warning = notif
    this.refresh()
  }
  set addSuccess(notif: string) {
    this._success = notif
    this.refresh()
  }
  set addInfo(notif: string) {
    this._info = notif
    this.refresh()
  }

  public init() {
    document.body.addEventListener('show notification', () => this.render())
  }

  public render(): void {
    this.component.innerHTML = `
        ${this.renderError}${this.renderWarning}${this.renderSuccess}${this.renderInfo}`
  }

  /**
   * @desc Refresh fucntion to emmit event when add a notification
   */
  private refresh(): void {
    const event = new Event('show notification')
    const element = this.component
    document.body.dispatchEvent(event)
    document.getElementById('header').scrollIntoView()
    const alert = element.querySelector('.alert')
    fadeOut(alert as HTMLElement, 5000, () => alert.remove())
    this.clean()
  }

  /**
   * Clean notification with rendering
   */
  private clean() {
    this._error = ''
    this._warning = ''
    this._success = ''
    this._info = ''
  }

  /**
   * @desc Render if error exist
   * @return {string}
   */
  private get renderError(): string {
    if (this.error)
      return /* HTML */ `
        <article class="alert alert-danger" role="alert" data-alert="danger">
          <ul>
            <li>${this.error}</li>
          </ul>
        </article>
      `
    return ''
  }
  /**
   * @desc Render if warning exist
   * @return {string}
   */
  private get renderWarning(): string {
    if (this.warning)
      return /* HTML */ `
        <article class="alert alert-warning" role="alert" data-alert="warning">
          <ul>
            <li>${this.warning}</li>
          </ul>
        </article>
      `
    return ''
  }
  /**
   * @desc Render if success exist
   * @return {string}
   */
  private get renderSuccess(): string {
    if (this.success)
      return /* HTML */ `
        <article class="alert alert-success" role="alert" data-alert="success">
          <ul>
            <li>${this.success}</li>
          </ul>
        </article>
      `
    return ''
  }
  /**
   * @desc Render if info exist
   * @return {string}
   */
  public get renderInfo(): string {
    console.log(this._info)

    if (this.info)
      return /* HTML */ `
        <article class="alert alert-info" role="alert" data-alert="info">
          <ul>
            <li>${this.info}</li>
          </ul>
        </article>
      `
    return ''
  }
}
