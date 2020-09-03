低代码系列之 - mock & 代理 工具

### install

`yarn create @setsuna/lowcode-mock`

### start

`yarn start`

mock server 默认在本地 3000 端口启动，访问 [http://localhost:3000/](http://localhost:3000/) 即可。

建议修改系统 host，比如后端接口地址为 `https://galaxy-sit.4009515151.com`，添加 host 为 `127.0.0.1 mock.galaxy-sit.4009515151.com`。前端项目中，本地开发的时候为了处理跨域问题，一般都配有代理。将代理的目标地址改为配的 host 映射地址即可，比如：

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

### mock

使用 vscode 插件 [yapi-code](https://marketplace.visualstudio.com/items?itemName=wjkang.yapi-code) ，可直接根据 JSON 数据或者 YAPI 接口定义自动生成 mock 接口以及 mock 数据。

#### 根据 YAPI 生成 mock

复制 YAPI 上接口 id ，比如 `https://yapi.bu6.io/project/869/interface/api/14037` 最后面的数字部分

[![wi3HeA.gif](https://s1.ax1x.com/2020/09/03/wi3HeA.gif)](https://imgchr.com/i/wi3HeA)

访问创建的 mock 接口，即可拿到随机的 mock 数据：

```
{"message":"12121","code":200,"result":{"bucket":"此压光称整马","upload_token":{"assumedRoleUser":{"arn":"千原个广心采","assumedRoleId":"作究界地口"},"credentials":{"securityToken":"加万打更我","accessKeyId":"情议完加展色","accessKeySecret":"场二最原特同","expiration":"织影正今消"},"requestId":"西再用看属资"},"endpiont":"色志支色联便","domain":"其空自处世层争"}}
```

#### 根据 JSON 生成 mock

复制 JSON 数据，如下格式都可以：

`标准 JSON 字符串`

```js
{
    "bucket": "lebang-test",
    "upload_token": {
      "assumedRoleUser": {
        "arn": "acs:ram::1116226057556727:role/falcon-oss-test/galaxy-session-name",
        "assumedRoleId": "329038561637201380:galaxy-session-name"
      },
      "credentials": {
        "securityToken": "eoVT4Ipqgg==",
        "accessKeyId": "STS.NTfz3WvAzXvo9ujwxFXNhn1Vw",
        "accessKeySecret": "C2xPibDgSFLvon55tNsr4rYjg7ANbgayf5bpa5i4ftbR",
        "expiration": "2020-08-13T06:40:41Z"
      },
      "requestId": "FA294E76-EA32-47EF-8544-BE9E38691ADF"
    },
    "endpiont": "oss-cn-shenzhen.aliyuncs.com",
    "domain": "https://lebang-test.oss-cn-shenzhen.aliyuncs.com"
  }
```

`js 对象类型变量`

```js
const json = {
	bucket: 'lebang-test',
	upload_token: {
		assumedRoleUser: {
			arn: 'acs:ram::1116226057556727:role/falcon-oss-test/galaxy-session-name',
			assumedRoleId: '329038561637201380:galaxy-session-name',
		},
		credentials: {
			securityToken: 'eoVT4Ipqgg==',
			accessKeyId: 'STS.NTfz3WvAzXvo9ujwxFXNhn1Vw',
			accessKeySecret: 'C2xPibDgSFLvon55tNsr4rYjg7ANbgayf5bpa5i4ftbR',
			expiration: '2020-08-13T06:40:41Z',
		},
		requestId: 'FA294E76-EA32-47EF-8544-BE9E38691ADF',
	},
	endpiont: 'oss-cn-shenzhen.aliyuncs.com',
	domain: 'https://lebang-test.oss-cn-shenzhen.aliyuncs.com',
}
```

或者

```js
{
	bucket: 'lebang-test',
	upload_token: {
		assumedRoleUser: {
			arn: 'acs:ram::1116226057556727:role/falcon-oss-test/galaxy-session-name',
			assumedRoleId: '329038561637201380:galaxy-session-name',
		},
		credentials: {
			securityToken: 'eoVT4Ipqgg==',
			accessKeyId: 'STS.NTfz3WvAzXvo9ujwxFXNhn1Vw',
			accessKeySecret: 'C2xPibDgSFLvon55tNsr4rYjg7ANbgayf5bpa5i4ftbR',
			expiration: '2020-08-13T06:40:41Z',
		},
		requestId: 'FA294E76-EA32-47EF-8544-BE9E38691ADF',
	},
	endpiont: 'oss-cn-shenzhen.aliyuncs.com',
	domain: 'https://lebang-test.oss-cn-shenzhen.aliyuncs.com',
}
```

![wiJoyF.gif](https://s1.ax1x.com/2020/09/03/wiJoyF.gif)

> 通过 JSON 数据生成的 mock 接口需要手动修改路由地址。

#### 根据字段类型或字段名称生成特定的 mock 数据

配置 `yapi-code`：

```json
	"yapi-code.mockKeyWordLike": {
		"icon": "Random.image('48x48')",
		"img":"Random.image('48x48')",
		"image":"Random.image('48x48')",
		"code": "200&&number",
		"name":"'模糊匹配后生成的mock'"
	},
	"yapi-code.mockKeyWordEqual": {
		"message": "'这是一条精确的mock'",
		"total": 200,
	},
	"yapi-code.mockString": "Random.cword(5, 6)",
	"yapi-code.mockBoolean": "Random.boolean()",
	"yapi-code.mockNumber": "Random.natural(100,1000)"

```

根据 json 数据：

```js
const json = {
	code: 100,
	message: '请求成功',
	result: {
		list: [
			{
				code: '注意这是一个字符串的code',
				name: '张三',
				icon: '',
				actived: false,
			},
		],
		total: 0,
	},
}
```

生成如下代码

```js
.get(`xxxxx`, async (ctx, next) => {
		const list1 = []
		for (let i = 0; i < 10; i++) {
			list1.push({
				code: Random.cword(5, 6),
				name: '模糊匹配后生成的mock',
				icon: Random.image('48x48'),
				actived: Random.boolean(),
			})
		}
		ctx.body = {
			code: 200,
			message: '这是一条精确的mock',
			result: { list: list1, total: 200 },
		}
	})
```

访问 mock 接口即可拿到如下类似数据：

```json
{
	"code": 200,
	"message": "这是一条精确的mock",
	"result": {
		"list": [
			{
				"code": "八别因教者活",
				"name": "模糊匹配后生成的mock",
				"icon": "http://dummyimage.com/48x48",
				"actived": true
			},
			{
				"code": "毛着何工时白",
				"name": "模糊匹配后生成的mock",
				"icon": "http://dummyimage.com/48x48",
				"actived": false
			},
			{
				"code": "县称县单下外",
				"name": "模糊匹配后生成的mock",
				"icon": "http://dummyimage.com/48x48",
				"actived": true
			},
			{
				"code": "面养号加事",
				"name": "模糊匹配后生成的mock",
				"icon": "http://dummyimage.com/48x48",
				"actived": true
			},
			{
				"code": "干但天大能去",
				"name": "模糊匹配后生成的mock",
				"icon": "http://dummyimage.com/48x48",
				"actived": false
			},
			{
				"code": "指任经二办",
				"name": "模糊匹配后生成的mock",
				"icon": "http://dummyimage.com/48x48",
				"actived": false
			},
			{
				"code": "革天制中况把",
				"name": "模糊匹配后生成的mock",
				"icon": "http://dummyimage.com/48x48",
				"actived": true
			},
			{
				"code": "深红习种定",
				"name": "模糊匹配后生成的mock",
				"icon": "http://dummyimage.com/48x48",
				"actived": true
			},
			{
				"code": "常群高象收史",
				"name": "模糊匹配后生成的mock",
				"icon": "http://dummyimage.com/48x48",
				"actived": true
			},
			{
				"code": "月京育团使",
				"name": "模糊匹配后生成的mock",
				"icon": "http://dummyimage.com/48x48",
				"actived": true
			}
		],
		"total": 200
	}
}
```

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
router.get('/proxy', proxy('https://blog.bu6.io/'), (ctx) => {
	ctx.body = 'https://blog.bu6.io/'
})
```

> 来自 `/proxy` 的请求转发到 `https://blog.bu6.io/proxy` ，用于后端接口可联调的时候跳过本地 mock，转发请求到后端接口。

```js
router.all(
	new RegExp('^/galaxy/api/bms/(|^$)'),
	proxy('https://galaxy-sit.4009515151.com')
)
```

> 不需要 mock 并且匹配正则的接口直接转发到后端地址。

```

```
