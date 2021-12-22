import { ModelValidator } from '../lib/frontmodel'

export const validators_validateNotEmpty = <T>(
  validator: ModelValidator<T, any>,
  property: keyof T
) => {
  const value = (validator.validatable as any)[property as any]
  if (!value) {
    validator.addError(property, 'Must be filled')
    return
  }
  validator.removeErrors(property)
}

export const validators_validateEmail = <T>(
  validator: ModelValidator<T, any>,
  property: keyof T
) => {
  const value = (validator.validatable as any)[property as any]
  const message = 'Email should be valid'
  if (!/^\S+@\S+\.\S+$/.test(value)) {
    validator.addError(property, message)
    return
  }
  validator.removeErrors(property)
}

export const validators_validatePhone = <T>(
  validator: ModelValidator<T, any>,
  property: keyof T
) => {
  const message = 'Phone should be valid'
  const value = (validator.validatable as any)[property as any]
  if (/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g.test(value)) {
    validator.removeErrors(property)
  } else {
    validator.addError(property, message)
  }
}
