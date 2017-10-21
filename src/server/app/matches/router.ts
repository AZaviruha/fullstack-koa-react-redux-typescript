
import * as Router from 'koa-router'
import { get } from 'lodash'
import { getApiRoutePrefix } from '../../common/helpers'
import { findMatches } from './dao'
import sanitize from './sanitize'
const router = new Router({
  prefix: getApiRoutePrefix()
})

router.get('/matches', async ctx => {
  const payload = {
    age: { gte: 18, lte: 50 },
    height: { gte: 140, lte: 200 },
    maxDistance: 100,
    hasPhoto: true,
    compatibilityScore: { gte: 0, lte: 0.99 },
    contactsExchanged: true,
    isFavourite: true
  }
  ctx.body = await findMatches(sanitize(payload))
})

router.post('/matches', async ctx => {
  ctx.body = await findMatches(sanitize({}))
})

export default router.routes()
