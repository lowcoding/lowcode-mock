import KoaRouter from 'koa-router'
import proxy from '../middleware/Proxy'
import { delay } from '../lib/util'
let Mock = require('mockjs')
let Random = Mock.Random

const router = new KoaRouter()
router
	.get('/', (ctx) => {
		ctx.body = 'lowcode-mock'
	})
	.get('/delay', (ctx) => {
		delay(3)
		ctx.body = 'delay'
	})
	.get('/httpError', (ctx) => {
		ctx.status = 401
		ctx.body = 'http 401'
	})
	.get('/mock', (ctx) => {
		const list2 = []
		for (let i = 0; i < 10; i++) {
			list2.push(Random.cword(5, 7))
		}
		const list1 = []
		for (let i = 0; i < 10; i++) {
			list1.push({ name: Random.cword(5, 7), area: list2 })
		}
		ctx.body = { name: Random.cword(5, 7), city: list1 }
	})
	.get('/proxy', proxy('https://github.com/wjkang/lowcode-mock'), (ctx) => {
		ctx.body = 'https://github.com/wjkang/lowcode-mock'
	})
	.all(
		new RegExp('^/lowcode/mock/(|^$)'),
		proxy('https://github.com/wjkang/lowcode-mock')
	)
module.exports = router
