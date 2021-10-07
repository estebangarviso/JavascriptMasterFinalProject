import ComponentInterface from '@interfaces'
import Data from './Data'

export default abstract class Component implements ComponentInterface {
  public _element: HTMLElement | null = null
  
  protected truncateString = Data.truncateString

  public set component(component: HTMLElement | null) {
    if (this._element) this._element = component
    else throw new Error("Component can't be set")
  }

  public get component(): HTMLElement {
    if (this._element) return this._element
    else throw new Error('Component is not defined')
  }
  public abstract init(): void

  public abstract render(): void
}
