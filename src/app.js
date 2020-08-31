import Koa2 from 'koa'
import KoaBody from 'koa-body'
import cors from 'koa2-cors'
import Routes from './routes/index'
import ErrorRoutesCatch from './middleware/ErrorRoutesCatch'
const https = require('https')
const fs = require('fs')

const app = new Koa2()
const env = process.env.NODE_ENV || 'development' // Current mode

app.use(
	cors({
		origin: (ctx) => {
			return ctx.headers.origin
		},
		credentials: true,
	})
)
if (env === 'development') {
	// logger
	app.use((ctx, next) => {
		const start = new Date()
		return next().then(() => {
			const ms = new Date() - start
			console.log(
				`${ctx.method} ${decodeURI(ctx.url)} - ${ms}ms data:${JSON.stringify(
					ctx.request.body
				)}`
			)
		})
	})
}
app.use(ErrorRoutesCatch()).use(
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
console.log('Now start API server on port ' + 3000 + '...')

export default app
