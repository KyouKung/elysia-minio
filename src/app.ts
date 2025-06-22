import { Elysia } from 'elysia'

import AppPlugin from './app.plugin'
import AppController from './app.controller'
import AppModule from './app.module'

const PORT = process.env.PORT || Bun.env.PORT || 3000

const App = new Elysia({ name: 'CoreServiceApp' })

  .use(AppPlugin)
  .use(AppController)
  .use(AppModule)

  .listen(PORT)

export type App = typeof App

console.log(
  `🦊 Elysia is running at http://${App.server?.hostname}:${App.server?.port}`,
)
