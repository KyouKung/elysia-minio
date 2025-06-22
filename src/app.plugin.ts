import { Elysia } from 'elysia'
import cors from '@elysiajs/cors'
import { swagger } from '@elysiajs/swagger'

//ignore prettier
const AppPlugin = new Elysia({ name: 'AppPlugin' }).use(cors()).use(
  swagger({
    path: '/api/docs',
    autoDarkMode: true,
    documentation: {
      tags: [{ name: 'v1' }],
    },
  }),
)

export default AppPlugin
