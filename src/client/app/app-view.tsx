import { Router, Link } from '@baseloop/router'
import * as React from 'react'

export interface Props {
  router: Router
  profile: React.ReactElement
  search: React.ReactElement
  say: React.ReactElement
  children: React.ReactElement
}

export function AppView({ profile, search, say, children, router }: Props) {
  return (
    <div>
      <div>
        <h1>Baseloop example project</h1>
        <p>Click the links to navigate:</p>
        <ul>
          <li>
            <Link routeName="home" router={router}>
              Front page
            </Link>
          </li>
          <li>
            <Link routeName="profile" router={router}>
              &quot;Profile&quot; page with an editable form
            </Link>
          </li>
          <li>
            <Link routeName="search" router={router}>
              &quot;Search&quot; page with basic search functionality
            </Link>
          </li>
          <li>
            <Link routeName="children" router={router}>
              &quot;Children&quot; page that demonstrates a sub-page implementation
            </Link>
          </li>
          <li>
            <Link
              routeName="say"
              pathVariables={{ textToSay: 'Example text from url' }}
              queryParameters={{ color: 'red' }}
              router={router}
            >
              &quot;Say&quot; page that outputs text from the URL
            </Link>
          </li>
          <li>
            <a onClick={() => window.location.assign('http://localhost:8080/asdasdasd')}>Some 404 page</a>
          </li>
        </ul>
      </div>
      <hr />
      {router.matchExact('home') && (
        <div>
          <h1>This is the front page.</h1>
        </div>
      )}
      {router.match('profile') && profile}
      {router.match('search') && search}
      {router.match('children') && children}
      {router.match('say') && say}
      {router.matchNoRoute() && (
        <div>
          <h1>Page not found</h1>
          <p>The page you were looking for could not be found.</p>
        </div>
      )}
    </div>
  )
}
