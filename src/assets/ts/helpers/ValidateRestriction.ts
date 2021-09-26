export default class ValidationRestriction {
  public static message(restriction: string) {
    if (restriction === 'isEmail') {
      return 'Por favor incluya @ y dominio en su correo'
    }
    if (restriction === 'isPassword') {
      return `Por favor debe tener al menos 8 caracteres`
    }
    if (restriction === 'required') {
      return 'Campo requerido, por favor ingrese un valor'
    }
    return 'Formato inválido'
  }
}
