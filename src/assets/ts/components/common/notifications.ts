import { NotificationInterface } from '@interfaces'
import Component from '@helpers/Component'

export default class Notifications
  extends Component
  implements NotificationInterface
{
  public error: string = ''
  public warning: string = ''
  public success: string = ''
  public info: string = ''

  init() {
    this.component = document.getElementById('notifications')
    this.component.addEventListener('showNotifications', this.render)
  }

  public render(): void {
    this.component.innerHTML = `
        ${this.renderError}
        ${this.renderWarning}
        ${this.renderSuccess}
        ${this.renderInfo}`
  }

  set addError(notif: string) {
    this.error = notif
    this.refresh()
  }
  set addWarning(notif: string) {
    this.warning = notif
    this.refresh()
  }
  set addSuccess(notif: string) {
    this.success = notif
    this.refresh()
  }
  set addInfo(notif: string) {
    this.info = notif
    this.refresh()
  }
  /**
   * @desc Refresh fucntion to emmit event when add a notification
   */
  private refresh(): void {
    const event = new CustomEvent('showNotifications')
    this.component.dispatchEvent(event)
  }
  /**
   * @desc Render if error exist
   * @return {string}
   */
  private get renderError() {
    if (this.error)
      return /* HTML */ `
        <article class="alert alert-danger" role="alert" data-alert="danger">
          <ul>
            <li>${this.error}</li>
          </ul>
        </article>
      `
    else return ''
  }
  /**
   * @desc Render if warnig exist
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
    else return ''
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
    else return ''
  }
  /**
   * @desc Render if info exist
   * @return {string}
   */
  private get renderInfo(): string {
    if (this.info)
      return /* HTML */ `
        <article class="alert alert-info" role="alert" data-alert="info">
          <ul>
            <li>${this.info}</li>
          </ul>
        </article>
      `
    else return ''
  }
}
