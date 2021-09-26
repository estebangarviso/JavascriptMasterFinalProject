import { FormInterface } from '@interfaces'
import Component from '@helpers/Component'
import FormField from '@helpers/FormField'
import Validate from '@helpers/Validate'
import ValidateRestriction from '@helpers/ValidateRestriction'

export default abstract class AbstractForm
  extends Component
  implements FormInterface
{
  protected _errors: { name: string; error: string[] }[] = []
  protected abstract get format(): FormField[]

  public get errors() {
    this._errors = []
    this.format.forEach((field) => {
      this._errors.push({ name: field.name, error: field.errors })
    })
    return this._errors
  }

  public hasErrors() {
    let hasErrors = false
    this.errors.forEach((field) => {
      if (field.error.length) {
        hasErrors = true
      }
    })

    return hasErrors
  }

  public validate(form: HTMLFormElement): boolean {
    for (let field of this.format) {
      field.errors = []
      if (field.required && !field.value) {
        field.addError(ValidateRestriction.message('required'))
        return false
        continue
      } else if (!field.required && !field.value) {
        continue
      }

      for (let restriction of field.restrictions) {
        if (typeof restriction !== 'number') {
          if (Validate[restriction](field.value)) {
            field.addError(ValidateRestriction.message(restriction))
            return false
          }
        }
      }
    }

    return !this.hasErrors()
  }

  submit(event: Event): boolean {
    // submit listen in init() Child class
    throw new Error('Method not implemented.')
  }
  public init(): void {}

  public abstract render(): void
}
