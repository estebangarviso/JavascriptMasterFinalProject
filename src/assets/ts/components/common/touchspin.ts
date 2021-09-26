/**
 *  @class
 *  @function Touchspin
 *  @param {DOMobject} element to create a quantity wrapper around
 */
export default class Touchspin {
  // Create input
  public input = document.createElement('input')

  // Defualt text for buttons
  public decreaseHTML = '-'
  public increaseHTML = '+'
  // Buttons
  public down
  public up
  constructor(
    self: Element,
    childInputClassName: string,
    decreaseHTML: string,
    increaseHTML: string
  ) {
    let input: HTMLInputElement | undefined = undefined
    if (childInputClassName) {
      input = self.querySelector(childInputClassName)
    } else {
      this.input.value = '1'
      this.input.type = this.input.type || 'number'
      this.input.name = this.input.name || 'qty'
      this.input.min = this.input.min || '1'
    }

    // Get text for buttons
    this.decreaseHTML = decreaseHTML || this.decreaseHTML
    this.increaseHTML = increaseHTML || this.increaseHTML
    // Button constructor
    function Button(HTML: string, className: string) {
      const button = document.createElement('button')
      button.type = 'button'
      button.innerHTML = HTML
      className = className.trim()
      let _className = className.split(' ')
      button.classList.add(..._className)

      return button
    }
    // Create buttons
    this.down = Button(
      this.decreaseHTML,
      'btn btn-touchspin js-touchspin bootstrap-touchspin-down'
    )
    this.up = Button(
      this.increaseHTML,
      'btn btn-touchspin js-touchspin bootstrap-touchspin-up'
    )
    if (input) {
      // Add functionality to buttons
      this.down.addEventListener('click', () => this.change_quantity(-1, input))
      this.up.addEventListener('click', () => this.change_quantity(1, input))

      // Add input and buttons to wrapper
      self.insertBefore(this.down, self.childNodes[0])
      self.appendChild(this.up)
    } else {
      // Add functionality to buttons
      this.down.addEventListener('click', () => this.change_quantity(-1))
      this.up.addEventListener('click', () => this.change_quantity(1))

      // Add input and buttons to wrapper
      self.appendChild(this.down)
      self.appendChild(this.input)
      self.appendChild(this.up)
    }
  }

  public change_quantity(change: number, input?: HTMLInputElement) {
    // Get current value
    let quantity: number
    if (!input) quantity = Number(this.input.value)
    else quantity = Number(input.value)

    // Ensure quantity is a valid number
    if (isNaN(quantity)) quantity = 1

    // Change quantity
    quantity += change

    // Ensure quantity is always a number
    quantity = Math.max(quantity, 1)

    // Output number
    if (!input) this.input.value = quantity + ''
    else input.value = quantity + ''
  }

  public init() {
    let touchspins = document.querySelectorAll('.input-group-add-cart')
    touchspins.forEach(
      (touchspin) =>
        new Touchspin(
          touchspin,
          'input-qty',
          '<i class="fas fa-minus touchspin-down"></i>',
          '<i class="fas fa-plus touchspin-up"></i>'
        )
    )
  }
}
