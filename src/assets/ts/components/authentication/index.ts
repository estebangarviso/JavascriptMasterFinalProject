import AbstractForm from '@helpers/AbstractForm'
import Data from '@helpers/Data'
import FormField from '@helpers/FormField'
import Validate from '@helpers/Validate'
import { CustomerInterface } from '@interfaces'

export default class AuthenticationForm extends AbstractForm {
  private _format: FormField[] = []
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
    let format = [],
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

    return this._format.length ? this._format : format
  }

  private set format(format: FormField[]) {
    this._format = format
  }

  constructor(data: Data) {
    super()
    this.data = data
  }

  init() {
    this.customerPersist()
    this.render()
    this.refresh()
  }

  private refresh() {
    const form = document.getElementById('authentication-form')
    if (form) {
      this.floatingLabels()
      form.addEventListener('submit', (event: Event) => {
        event.preventDefault()
        const target = event.target as HTMLFormElement
        const isValid = this.validate(target)
        console.log({ isValid })
      })
    }
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
        this.isLogged = !!JSON.parse(isLogged)
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

    return result && !!result.id_customer
  }

  private addValues(form: HTMLFormElement) {
    let newFormat: FormField[] = []
    this.format.forEach((field) => {
      const input = form.querySelector(
        `[name=${field.name}]`
      ) as HTMLInputElement
      field.value = input.value
      newFormat.push(field)
    })
    this.format = []
    this.format = newFormat
  }
  public validate(form: HTMLFormElement) {
    // Add values to format
    this.addValues(form)
    // Proceed with validations
    const customerEmail = this.getValue('email')
    if (!this.customerExists(customerEmail)) {
      this.getField('email').addError('No esta registrado')
    }
    
    return super.validate(form)
  }

  public logOut() {
    if (this.isLogged) {
      localStorage.setItem('isLogged', JSON.stringify(false))
      this.render()
    }
  }

  public render() {
    document.getElementById(
      'js-authentication'
    ).innerHTML = `${this.renderAuthentication}${this.renderWelcome}`
    this.addValues(
      document.getElementById('authentication-form') as HTMLFormElement
    )
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
        ${this.format
          .map(
            (field) => `<div class="control-group">
            <div class="col-md-12 form-group floating-label-form-group mb-0 pb-2">${field.render()}</div>
            </div>`
          )
          .join('')}

        <br />
        <div class="form-group">
          <button
            class="btn btn-primary w-100"
            id="submitAuthentication"
            name="submitAuthentication"
            type="submit"
          >
            Ingresar
          </button>
        </div>
      </form>
      <div id="dev-info" class="py-2">
        <h6 class="text-center">DATOS DE DESARROLLO</h6>
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
    const labels = document.querySelectorAll('.floating-label-form-group')
    if (labels.length) {
      for (let label of Array.from(labels)) {
        label.addEventListener('input', function (event: Event) {
          let target = event.target as HTMLInputElement
          label.classList.toggle(
            'floating-label-form-group-with-value',
            !!target.value
          )
        })
        label.addEventListener('change', function (event: Event) {
          let target = event.target as HTMLInputElement
          label.classList.toggle(
            'floating-label-form-group-with-value',
            !!target.value
          )
        })
        label.addEventListener('focus', function (event: Event) {
          label.classList.add('floating-label-form-group-with-focus')
        })
        label.addEventListener('blur', function (event: Event) {
          label.classList.remove('floating-label-form-group-with-focus')
        })
      }
    }
  }
}
