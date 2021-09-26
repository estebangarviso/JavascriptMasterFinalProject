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
    this.errors.forEach((field) => {
      if (field.error.length) {
        return true
      }
    })

    return false
  }

  public validate(): boolean {
    for (let field of this.format) {
      field.errors = []
      if (field.required && !field.value) {
        field.addError(ValidateRestriction.message('required'))

        continue
      } else if (!field.required && !field.value) {
        continue
      }

      for (let restriction of field.restrictions) {
        if(typeof restriction !== 'number'){
          if (Validate[restriction](field.value)) {
            field.addError(ValidateRestriction.message(restriction))
          }
        }
      }
    }

    return !this.hasErrors()
  }

  public submit(event: Event) {
    event.preventDefault()
    return this.validate()
  }

  public init(): void {
    this.component.addEventListener('submit', this.submit)
  }

  public abstract render(): void
}
