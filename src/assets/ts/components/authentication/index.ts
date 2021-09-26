import AbstractForm from '@helpers/AbstractForm'
import Data from '@helpers/Data'
import FormField from '@helpers/FormField'
import Validate from '@helpers/Validate'
import { CustomerInterface } from '@interfaces'

export default class AuthenticationForm extends AbstractForm {
  private data: Data
  private _isLogged: boolean = false
  public get isLogged(): boolean {
    return this._isLogged
  }
  private set isLogged(isLogged: boolean) {
    this._isLogged = isLogged
  }
  private customer?: CustomerInterface

  /**
   * Fields format
   * @return {FormField[]}
   */
  public get format(): FormField[] {
    let format: FormField[] = [],
      email = new FormField(),
      password = new FormField()

    email.name = 'email'
    email.label = 'Correo'
    email.restrictions = ['isEmail']
    email.required = true
    email.maxLength = 255

    format.push(email)

    password.name = 'password'
    password.label = 'Contraseña'
    password.restrictions = ['isPassword']
    password.required = true
    password.maxLength = 255

    format.push(password)

    return format
  }
  constructor(data: Data) {
    super()
    this.data = data
  }

  init() {
    this.component = document.getElementById('authentication')
    this.customerPersist()
    this.render()
    this.floatingLabels()
  }
  /**
   * TODO Session Check Method
   * This method should check valid token from server side
   * But for this project, backend tech is not allowed so for similation
   * purposes it's going to check if variable isLogged is true from
   * localStorage
   * */
  private customerPersist() {
    let isLogged = localStorage.getItem('isLogged')
    if (isLogged) {
    } else {
      localStorage.setItem('isLogged', JSON.stringify(false))
      isLogged = localStorage.getItem('isLogged')
      if (isLogged) {
        this.isLogged = JSON.parse(isLogged)
      } else {
        this.isLogged = false
      }
    }
  }

  public customerExists(email: string) {
    if (!Validate.isEmail(email)) {
      return false
    }

    const result = this.data.getCustomerByEmail(email)

    return !!result.id_customer
  }

  public validate() {
    const customerEmail = this.getValue('email')

    return super.validate()
  }

  public logOut() {
    if (this.isLogged) {
      localStorage.setItem('isLogged', JSON.stringify(false))
      this.render()
    }
  }

  public render() {
    this.component.innerHTML = `${this.renderAuthentication}${this.renderWelcome}`
  }

  private get renderWelcome() {
    if (this.customer && this.isLogged)
      return /* HTML */ `
        <h6 class="text-center">
          Welcome ${this.customer.firstname} ${this.customer.lastname}
        </h6>
      `
    else return ''
  }

  private get renderAuthentication() {
    return /* HTML */ `
      <h2 class="text-center">Iniciar Sesión</h2>
      <form id="authentication-form" novalidate>
        <div class="form-row">
          <div class="col-md-6 form-group floating-label-form-group mb-0 pb-2">
            <input
              class="form-control px-3 rounded"
              id="email"
              name="email"
              type="email"
              placeholder="Correo"
              required="required"
              aria-invalid="false"
            />
            <div class="p help-block text-danger"></div>
          </div>
        </div>
        <div class="form-row">
          <div class="col-md-6 form-group floating-label-form-group mb-0 pb-2">
            <input
              class="form-control px-3 rounded"
              id="password"
              name="password"
              type="password"
              placeholder="Contraseña"
              required="required"
              aria-invalid="false"
            />
            <div class="p help-block text-danger"></div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <button
              class="btn btn-primary btn-block"
              id="submitAuthentication"
              name="submitAuthentication"
              type="submit"
            >
              Ingresar
            </button>
          </div>
        </div>
      </form>
      <div id="dev-info">
        <h3 class="text-center">DATOS DE DESARROLLO</h3>
        <p>
          <span class="label label-info">Usuario: demo@demo.com</span><br />
          <span class="label label-info">Contraseña: demodemo</span>
        </p>
      </div>
    `
  }

  public getField(fieldName: string) {
    let field = this.format.filter((field) => field.name === fieldName)[0]
    if (field) return field
    else return null
  }

  public getValue(fieldName: string) {
    let field = this.getField(fieldName)
    if (field) {
      return field.value
    }

    return null
  }

  private floatingLabels() {
    const withValue = function (event: Event) {
      let target = event.target as HTMLInputElement

      target.classList.toggle(
        'floating-label-form-group-with-value',
        !!target.value
      )
    }

    const labels = document.querySelectorAll('.floating-label-form-group')
    if (labels.length) {
      for (let label of Array.from(labels)) {
        label.addEventListener('input', withValue)
        label.addEventListener('change', withValue)
        label.addEventListener('focus', function (event: Event) {
          let target = event.target as HTMLInputElement
          target.classList.add('floating-label-form-group-with-focus')
        })
        label.addEventListener('blur', function (event: Event) {
          let target = event.target as HTMLInputElement
          target.classList.remove('floating-label-form-group-with-focus')
        })
      }
    }
  }
}
