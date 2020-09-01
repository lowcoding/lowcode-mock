低代码系列之 - mock & 代理 工具

### install

`yarn create @setsuna/lowcode-mock`

### start

`yarn start`

mock server 默认在本地 3000 端口启动，访问 [http://localhost:3000/](http://localhost:3000/) 即可。

建议修改系统 host，比如后端接口地址为 `https://galaxy-sit.4009515151.com`，修改 host 为 `127.0.0.1 mock.galaxy-sit.4009515151.com`。前端项目中，本地开发的时候为了处理跨域问题，一般都配有代理。将代理的目标地址改为配的 host 映射地址即可，比如：

```js
export const define = {
	ENV: 'local',
	GALAXY_API_HOST: 'http://mock.galaxy-sit.4009515151.com:3000',
}

export const proxyList = [
	{
		origin: '/galaxy/api/bms',
		target: define.GALAXY_API_HOST,
	},
]
```

> `@setsuna/lowcode-mock` 默认支持跨域，前端项目中也可不配置代理，直接请求 `@setsuna/lowcode-mock` 起的服务即可。

### mock yapi

使用 [yapi-code](https://marketplace.visualstudio.com/items?itemName=wjkang.yapi-code) 插件

### 延时

```js
import KoaRouter from 'koa-router'
import proxy from '../middleware/Proxy'
import { delay } from '../lib/util'
let Mock = require('mockjs')
let Random = Mock.Random

const router = new KoaRouter()
router.get('/delay', (ctx) => {
	delay(3) // 3 秒后返回结果
	ctx.body = 'delay'
})
```

> 可用于测 loading 效果。

### http 异常状态码

```js
router.get('/httpError', (ctx) => {
	ctx.status = 401
	ctx.body = 'http 401'
})
```

### 代理

```js
router.get('/proxy', proxy('https://www.baidu.com/'), (ctx) => {
	ctx.body = 'https://www.baidu.com/'
})
```

> 来自 `/proxy` 的请求转发到 `https://www.baidu.com/proxy` ，用于后端接口可联调的时候跳过本地 mock，转发请求到后端接口。

```js
router.all(new RegExp('^/galaxy/api/bms/(|^$)'), proxy('https://galaxy-sit.4009515151.com'))
```

> 不需要 mock 的接口直接转发到后端地址。
