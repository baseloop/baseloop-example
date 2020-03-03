import * as React from 'react'
import { Input } from './input'
import { Atom } from '@baseloop/atom'

interface Props {
  onChange?: (value: string) => void
  value: Atom<number>
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}

export function NumberInput(props: Props) {
  return <Input {...props} formatter={String} parser={Number} />
}
