import Koa2 from 'koa'
import KoaRouter from 'koa-router'
import KoaBody from 'koa-body'
import cors from 'koa2-cors'
import Routes from './routes/index'
const https = require('https')
const fs = require('fs')
import proxy from './middleware/Proxy'

const app = new Koa2()

app.use(
	cors({
		origin: (ctx) => {
			return ctx.headers.origin
		},
		credentials: true,
	})
)
app.use((ctx, next) => {
	const start = new Date()
	return next().then(() => {
		const ms = new Date() - start
		console.log(`${ctx.method} ${decodeURI(ctx.url)} - ${ms}ms data:${JSON.stringify(ctx.request.body)}`)
	})
})
app.use(
	KoaBody({
		multipart: true,
		jsonLimit: '10mb',
		formLimit: '10mb',
		textLimit: '10mb',
	})
)
Object.keys(Routes).forEach(function (key) {
	app.use(Routes[key].routes()).use(Routes[key].allowedMethods())
})

const router = new KoaRouter()
router.all(new RegExp('^/lowcode/mock/(|^$)'), proxy('https://github.com/wjkang/lowcode-mock'))
app.use(router.routes()).use(router.allowedMethods())

const options = {
	key: fs.readFileSync('./src/ca-key.pem'),
	cert: fs.readFileSync('./src/ca-cert.pem'),
}
// https
// 	.createServer(options, app.callback())
// 	.listen(SystemConfig.API_SERVER_PORT, () => {
// 		console.log(
// 			'Now start API server on port ' +
// 				SystemConfig.API_SERVER_PORT +
// 				'...'
// 		)
// 	})
app.listen(3000)
console.log('start mock server on port ' + 3000 + '...')

export default app
