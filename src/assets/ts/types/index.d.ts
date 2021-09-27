import Validate from '@helpers/Validate'

import {
  CarrierInterface,
  CurrencyInterface,
  CustomerInterface,
  ProductInterface,
} from '@interfaces'

/** @type {CartTotalType} - Total type in cart */
export type CartTotalType = {
  type: string
  amount: number
  label: string
  value: string
}

/** @type {CartSubtotalsType} - Subtotal types in cart */
export type CartSubtotalsType = CartTotalType[]

/** @type {RestrictionType} - Validate restriction type */
export type RestrictionType = Exclude<keyof typeof Validate, 'prototype'>
/** @type {AsyncFetchType} - Async fetch type */
export type AsyncFetchType =
  | CarrierInterface[]
  | CurrencyInterface[]
  | CustomerInterface[]
  | ProductInterface[]
/** @type {BootstrapColumnSpacesType} - Bootstrap column spaces */
export type BootstrapColumnSpacesType =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
