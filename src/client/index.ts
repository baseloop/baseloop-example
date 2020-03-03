import { AutoReloadClient } from '@baseloop/dev'
import { isDevelopment } from '@baseloop/core'
import { AppController } from './app/app-controller'
import { render } from 'react-dom'

if (isDevelopment) {
  AutoReloadClient()
}

AppController().subscribe(app => render(app, document.querySelector('[data-app]')))
