import ComponentInterface from '@interfaces'
import Data from './Data'

export default abstract class Component implements ComponentInterface {
  private element: HTMLElement | null = null
  protected truncateString = Data.truncateString

  
  public set component(component: HTMLElement | null) {
    if (this.element) this.element = component
    else throw new Error("Component can't be set")
  }

  public get component(): HTMLElement {
    if (this.element) return this.element
    else throw new Error('Component is not defined')
  }
  public abstract init(): void

  public abstract render(): void
}