import React from 'react'
import { InputProps, TextField } from '@mui/material'
import { IFormInputProps } from '../IFormInputProps'

const PlainInput = ({
  formState,
  model,
  property,
  validateFunc,
  label,
  type,
  inputProps,
  sx,
  required
}: IFormInputProps & {
  label?: string
  type?: React.InputHTMLAttributes<unknown>['type']
  inputProps?: InputProps
  required?: boolean
}) => {
  formState.use()
  const value = (model as any)[property]
  const firstError = model.validator.getFirstErrorFor(property)

  return (
    <TextField
      sx={sx}
      label={label}
      required={required}
      type={type}
      value={value ?? ''}
      error={!!firstError}
      helperText={firstError}
      onChange={(e) => {
        ;(model as any)[property] = e.target.value
        validateFunc?.()
        formState.update()
      }}
      InputProps={inputProps}
    />
  )
}

export { PlainInput }
