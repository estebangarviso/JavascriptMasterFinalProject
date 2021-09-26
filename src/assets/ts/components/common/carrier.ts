import { CarrierInterface } from '@interfaces'

export default class Carrier {
  id_carrier: number
  fixed_price: number
  per_package: number
  constructor(carrier: CarrierInterface) {
    this.id_carrier = carrier.id_carrier
    this.fixed_price = carrier.fixed_price
    this.per_package = carrier.per_package
  }
}
