import { delay } from 'rxjs/operators'
import { Observable, of } from 'rxjs'
import { SearchResult } from './search-result'

const sampleNames = [
  'Luke',
  'Oliver',
  'Jake',
  'Noah',
  'James',
  'Jack',
  'Connor',
  'Liam',
  'John',
  'Harry',
  'Callum',
  'Mason',
  'Robert',
  'Jacob',
  'Jacob',
  'Jacob',
  'Michael',
  'Charlie',
  'Kyle',
  'William',
  'William',
  'Thomas',
  'Joe',
  'Ethan',
  'David',
  'George',
  'Reece',
  'Michael',
  'Richard',
  'Oscar',
  'Rhys',
  'Alexander',
  'Joseph',
  'James',
  'Charlie',
  'James',
  'Charles',
  'William',
  'Damian',
  'Daniel',
  'Thomas',
]

export const searchRoute = (keyword: string): Observable<SearchResult[]> => {
  const results = sampleNames
    .filter(n => n.toLowerCase().includes(keyword.toLowerCase()))
    .map(name => ({
      name,
      age: Number((Math.random() * 100).toFixed(0)),
    }))
    .slice(0, 10)

  return of(results).pipe(delay(2500))
}
