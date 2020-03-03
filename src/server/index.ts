import Koa from 'koa'
import serveStatic from 'koa-static'
import { promises as fs } from 'fs'
import path from 'path'

const app = new Koa()

app.use(
  serveStatic('dist/client', {
    index: false,
    maxAge: 31557600,
  }),
)

app.use(async (ctx: Koa.ParameterizedContext) => {
  const indexHtml = await fs.readFile(path.join('dist/client', 'index.html'))

  ctx.headers['content-type'] = 'text/html'
  ctx.body = indexHtml.toString('utf-8')
})

app.listen(8080, '0.0.0.0', () => {
  console.log(`Running at http://0.0.0.0:8080/`)
})
