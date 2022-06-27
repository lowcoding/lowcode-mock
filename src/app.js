import Koa2 from 'koa';
import KoaRouter from 'koa-router';
import KoaBody from 'koa-body';
import cors from 'koa2-cors';
import Routes from './routes/index';
import proxy from './middleware/Proxy';
import config from './config';

const https = require('https');
const fs = require('fs');

const app = new Koa2();

app.use(
  cors({
    origin: (ctx) => ctx.headers.origin,
    credentials: true,
  }),
);
app.use((ctx, next) => {
  const start = new Date();
  return next().then(() => {
    const ms = new Date() - start;
    console.log(
      `${ctx.method} ${decodeURI(ctx.url)} - ${ms}ms data:${JSON.stringify(
        ctx.request.body,
      )}`,
    );
  });
});
app.use(
  KoaBody({
    multipart: true,
    jsonLimit: '10mb',
    formLimit: '10mb',
    textLimit: '10mb',
  }),
);
Object.keys(Routes).forEach((key) => {
  app.use(Routes[key].routes()).use(Routes[key].allowedMethods());
});

const router = new KoaRouter();
router.all(
  new RegExp('^/lowcode-mock(|^$)'),
  proxy('https://github.com/wjkang'),
);
app.use(router.routes()).use(router.allowedMethods());

if (config.https) {
  const options = {
    key: fs.readFileSync('./src/ca-key.pem'),
    cert: fs.readFileSync('./src/ca-cert.pem'),
  };
  https.createServer(options, app.callback()).listen(config.port, () => {
    console.log(`start https mock server on port  ${config.port} ...`);
  });
} else {
  app.listen(config.port, () => {
    console.log(`start mock server on port  ${config.port} ...`);
  });
}

export default app;
