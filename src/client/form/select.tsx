import * as React from 'react'
import { Atom } from '@baseloop/atom'
import { useAtom } from '@baseloop/hooks'

export interface SelectOption<T> {
  id: T
  label: string
}

interface Props<T> {
  value: Atom<T | null>
  options: SelectOption<T>[]
  onChange?: (value: string) => void
}

export function Select<T extends string | number>(props: Props<T>) {
  const value = useAtom(props.value)

  return (
    <select onChange={handleChange} value={value || ''}>
      <option key="default">Choose...</option>
      {props.options.map((option, i) => (
        <option value={option.id} key={i}>
          {option.label}
        </option>
      ))}
    </select>
  )

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    if (props.onChange) {
      props.onChange(e.target.value)
    }
    props.value.set(e.target.value as T)
  }
}

Select.defaultProps = {
  onChange: () => null,
  options: [],
}
