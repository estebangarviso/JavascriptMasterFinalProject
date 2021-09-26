import { BootstrapColumnSpacesType, RestrictionType } from '@types'
import Component from '@helpers/Component'

export default class FormField extends Component {
  //bootstrap columns spaces in a form row
  private _col: BootstrapColumnSpacesType = '12'
  private _name: string = ''
  private _label: string = ''
  private _type: string = 'text'
  private _required: boolean = false
  private _value: number | string | null = null
  private _maxLength: number | null = null
  private _errors: string[] = []
  private _restrictions: RestrictionType[] = []

  public get col() {
    return this._col
  }

  public set col(columnSpace) {
    this._col = columnSpace
  }

  public get name() {
    return this._name
  }

  public set name(name: string) {
    this._name = name
  }

  public get label() {
    return this._label
  }
  public set label(label: string) {
    this._label = label
  }

  public get type(): string {
    return this._type
  }
  public set type(name: string) {
    this._type = name
  }

  public get value(): number | string | null {
    let input = this.component.querySelector('input')
    if (input) return input.value
    return null
  }

  public get required(): boolean {
    return this._required
  }
  public set required(required: boolean) {
    this._required = required
  }

  public get maxLength(): number | null {
    return this._maxLength
  }
  public set maxLength(maxLength: number | null) {
    this._maxLength = maxLength
  }

  public get errors(): string[] {
    return this._errors
  }
  public set errors(errors: string[]) {
    this._errors = errors
  }
  public addError(error: string) {
    this._errors.push(error)
  }

  public get restrictions(): RestrictionType[] {
    return this._restrictions
  }
  public set restrictions(restrictions: RestrictionType[]) {
    this._restrictions = restrictions
  }
  public addRestriction(restriction: RestrictionType) {
    this._restrictions.push(restriction)
  }

  public init() {
    this.render()
  }

  public refresh() {
    this.render()
  }

  public render(): void {
    this.component.innerHTML = `${this.renderField}`
  }

  private get renderField(): string {
    return /* HTML */ `<label>${this.label}</label
      ><input
        name="${this.name}"
        id="${this.name}"
        type="${this.type}"
        placeholder="${this.label}"
      />
      <p class="help-block text-danger">${this.renderError}</p>`
  }

  private get renderError(): string {
    if (this.errors.length) {
      return /* HTML */ `<ul>
        ${this.errors.map((error) => `<li>${error}</li>`)}
      </ul>`
    } else {
      return ''
    }
  }
}
