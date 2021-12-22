import { IFormInputProps } from '../IFormInputProps'
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SxProps
} from '@mui/material'
import React from 'react'

interface SelectPairs {
  text: string
  value: any
}

const findSelectPairByValue = (selectPairs: SelectPairs[], value: any) => {
  return selectPairs.find((it) => {
    return it.value === value
  })
}

const PlainSelect = ({
  formState,
  validateFunc,
  property,
  model,
  selectPairs,
  label,
  sx
}: IFormInputProps & {
  selectPairs: SelectPairs[]
  label?: string
  sx?: SxProps
}) => {
  formState.use()
  const modelAsAny = model as any
  const value = modelAsAny[property]
  const error = model.validator.getFirstErrorFor(property)

  return (
    <FormControl sx={sx}>
      <InputLabel>{label}</InputLabel>
      <Select
        sx={{ width: '100%' }}
        error={!!error}
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={value ?? ''}
        label="Age"
        onChange={(e) => {
          const inputValue = e.target.value
          const selectedPair = findSelectPairByValue(selectPairs, inputValue)
          modelAsAny[property] = selectedPair?.value
          validateFunc?.()
          formState.update()
        }}
      >
        {selectPairs.map((it) => {
          return (
            <MenuItem value={it.value} key={it.text}>
              {it.text}
            </MenuItem>
          )
        })}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
}

export { PlainSelect }
