import { createReactiveElement } from '@baseloop/core'
import { Router } from '@baseloop/router'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { SayView } from './say-view'

interface Params {
  router: Router
}

export interface DataFromUrl {
  color: string
  textToSay: string
}

export function SayController({ router }: Params) {
  const dataFromUrl: Observable<DataFromUrl> = router.url.pipe(
    map(() => {
      const match = router.match('say')
      if (match == null) {
        return {
          color: 'green',
          textToSay: 'default value',
        }
      } else {
        return {
          color: match.queryParameters['color'],
          textToSay: match.pathVariables['textToSay'],
        }
      }
    }),
  )

  return {
    view: createReactiveElement(SayView, { router: of(router), dataFromUrl }),
  }
}
