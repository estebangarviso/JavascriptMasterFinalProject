export default class Validate {
  private static PASSWORD_LENGTH: number = 8
  /**
   * Check for e-mail validity.
   *
   * @param {string} email - e-mail address to validate
   *
   * @return {boolean}
   */
  public static isEmail(email: any): boolean {
    return (
      !this.isEmpty(email) ||
      /^[a-z\p{L}0-9!#$%&'*+\/=?^`{}|~_-]+[.a-z\p{L}0-9!#$%&'*+\/=?^`{}|~_-]*@[a-z\p{L}0-9]+(?:[.]?[_a-z\p{L}0-9-])*\.[a-z\p{L}0-9]+$/iu.test(
        email
      )
    )
  }
  /**
   * Check for password validity.
   *
   * @param {string} password - Password to validate
   *
   * @param {number} size
   *
   * @return {boolean}
   */
  public static isPassword(
    password: any,
    size: number = this.PASSWORD_LENGTH
  ): boolean {
    return password.length >= size
  }
  /**
   * Check if value is empty.
   *
   * @param {string} value - Value to validate
   *
   * @return {boolean}
   */
  public static isEmpty(value: any): boolean {
    return (
      !value ||
      !!(typeof value === 'object' && JSON.stringify(value) === '{}') ||
      !!(Array.isArray(value) && value.length)
    )
  }
  /**
   * Check if HTML Element exist in Loaded DOM
   *
   * @param {HTMLElement} element - HTML element on DOM to validate
   *
   * @return {boolean}
   */
  public static isHTMLElement(element: any): boolean {
    return element && element instanceof HTMLElement
  }
  /**
   * Check for standard name validity.
   *
   * @param {string} name - Name to validate
   *
   * @return {boolean}
   */
  public static isGenericName(name: any): boolean {
    return this.isEmpty(name) || /^[^<>={}]*$/u.test(name)
  }
}
