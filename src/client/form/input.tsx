import * as React from 'react'
import { Atom } from '@baseloop/atom'
import { useAtom } from '@baseloop/hooks'

interface Props<T> {
  onChange: (value: string) => void
  value: Atom<T>
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
  parser?: (value: string) => T
  formatter?: (value: T) => string
}

export function Input<T>(props: Props<T>) {
  const value = useAtom(props.value)
  const formatter = props.formatter || (a => String(a))
  const parser = props.parser || (a => a)

  return (
    <input value={value == null ? '' : formatter(value)} type="text" {...props.inputProps} onChange={handleChange} />
  )

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    props.onChange(value)
    props.value.set(parser(value) as T)
  }
}

Input.defaultProps = {
  inputProps: {},
  onChange: () => null,
}
