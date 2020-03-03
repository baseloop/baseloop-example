import * as React from 'react'
import { Input } from '../form/input'
import { SearchResult } from './search-result'
import { Atom } from '@baseloop/atom'
import { Observable } from 'rxjs'
import { useAtom, useObservable } from '@baseloop/hooks'

export interface Props {
  keyword: Atom<string>
  isSearching: Atom<boolean>
  searchResponse: Observable<SearchResult[]>
}

export function SearchView({ keyword, isSearching: isSearchingAtom, searchResponse }: Props) {
  const isSearching = useAtom(isSearchingAtom)
  const results = useObservable(searchResponse, [])

  return (
    <section>
      <h1>Search demo</h1>
      <p>This page demonstrates how to implement a simple search feature.</p>

      <div>
        <label>Type in the search keyword (try searching for &quot;ja&quot; or &quot;lu&quot;)</label>
        <Input value={keyword} inputProps={{ autoFocus: true }} />
        {isSearching && <span>Searching...</span>}
      </div>

      {!isSearching && (
        <>
          <h1>Search results</h1>
          <div className="result-container">
            {results.map((result, i) => (
              <div key={i}>
                <div>{result.name}</div>
                <div>{result.age}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  )
}
