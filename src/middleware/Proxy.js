const request = require('superagent')
const url = require('url')
module.exports = (host, referer = 'https://blog.bu6.io/') => {
	let hostObj = url.parse(host)
	return async function (ctx) {
		let result = {}
		try {
			result = await request(ctx.request.method, host + ctx.request.url)
				.set({
					...ctx.request.header,
					Referer: referer,
					Host: hostObj.hostname,
				})
				.send(ctx.request.body)

			ctx.body = result.type.indexOf('html') > -1 ? result.text : result.body
		} catch (ex) {
			ctx.status = ex.status
			ctx.body = ex.response.text
		}
		console.log('proxy')
		return
	}
}
