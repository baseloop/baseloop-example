import { createReactiveElement, isBrowser } from '@baseloop/core'
import { awaiting } from '@baseloop/rxjs'
import { Observable, of } from 'rxjs'
import { SearchResult } from './search-result'
import { SearchView } from './search-view'
import { debounceTime, distinctUntilChanged, filter, shareReplay, startWith, switchMap } from 'rxjs/operators'
import { Atom } from '@baseloop/atom'
import { searchRoute } from './search-db-mock'

export function SearchController() {
  const keyword = new Atom('')

  const searchRequest = keyword.pipe(
    filter(k => k != ''),
    debounceTime(400),
    distinctUntilChanged(),
    shareReplay(),
  )

  const searchResponse = isBrowser
    ? searchRequest.pipe(
        switchMap<string, Observable<SearchResult[]>>(keyword => searchRoute(keyword)),
        startWith([]),
        shareReplay(),
      )
    : of([])

  const isSearching = awaiting(searchRequest, searchResponse)

  return {
    view: createReactiveElement(SearchView, {
      keyword: of(keyword),
      isSearching: of(isSearching),
      searchResponse: of(searchResponse),
    }),
  }
}
