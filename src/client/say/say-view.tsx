import * as React from 'react'
import { Router } from '@baseloop/router'
import { DataFromUrl } from './say-controller'

export interface Props {
  router: Router
  dataFromUrl: DataFromUrl
}

export function SayView({ dataFromUrl }: Props) {
  return (
    <div style={{ color: dataFromUrl.color }}>
      <p>Text from the path variable: &quot;{dataFromUrl.textToSay}&quot; (text color taken from the URL parameter).</p>
    </div>
  )
}
