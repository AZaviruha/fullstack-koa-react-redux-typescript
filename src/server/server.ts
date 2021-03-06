import * as Koa from 'koa'
import * as koaStatic from 'koa-static'
import * as koaWebpack from 'koa-webpack'
import * as koaBodyParser from 'koa-bodyparser'
import * as path from 'path'
import config from './common/config'
import * as logger from 'koa-logger'
import matches from './app/matches/router'
import { NODE_ENV_DEV } from './common/constants'

const publicFolder = NODE_ENV_DEV
  ? config.dev.public
  : config.build.public

const app = new Koa()

app.use(logger())
app.use(koaBodyParser())
app.use(matches)

if (NODE_ENV_DEV) { // enable webpack hot reload
  // tslint:disable-next-line
  const webpackConfig = require(config.dev.webpack)

  app.use(koaWebpack({
    config: webpackConfig
  }))
}

app.use(koaStatic(publicFolder))

app.listen(config.port)

console.log(`Server running on port ${config.port}`)
