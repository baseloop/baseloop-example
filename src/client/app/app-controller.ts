import { Observable, of } from 'rxjs'
import * as React from 'react'
import { Router } from '@baseloop/router'
import { switchMap } from 'rxjs/operators'
import { createReactiveElement } from '@baseloop/core'
import { AppView } from './app-view'
import { ChildrenController } from '../children/children-controller'
import { SayController } from '../say/say-controller'
import { SearchController } from '../search/search-controller'
import { ProfileController } from '../profile/profile-controller'

export function AppController(): Observable<React.ReactElement> {
  const router = new Router(
    [
      { path: '/', name: 'home' },
      { path: '/profile', name: 'profile' },
      { path: '/search', name: 'search' },
      { path: '/say/:textToSay', name: 'say' },
      { path: '/children', name: 'children' },
      { path: '/children/child', name: 'children-child' },
      { path: '/children/child-2', name: 'children-child-2' },
    ],
    { initialUrl: window.location.href },
  )

  // Anything here is created once per application.

  const childrenController = ChildrenController({ router })
  const profileController = ProfileController()
  const sayController = SayController({ router })
  const searchController = SearchController()

  return router.url.pipe(
    switchMap(url => {
      // You can create route-specific controllers here based on the router's URL state changes.

      console.log('Entered', url)

      return createReactiveElement(AppView, {
        router: of(router),
        children: childrenController.view,
        profile: profileController.view,
        say: sayController.view,
        search: searchController.view,
      })
    }),
  )
}
