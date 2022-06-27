const request = require('superagent');
const url = require('url');

export default async function (
  ctx,
  host,
  referer = 'https://github.com/wjkang/lowcode-mock',
) {
  const hostObj = url.parse(host);
  let result = {};
  try {
    result = await request(ctx.request.method, host + ctx.request.url)
      .set({
        ...ctx.request.header,
        Referer: referer,
        Host: hostObj.hostname,
      })
      .send(ctx.request.body);
  } catch (ex) {
    result.body = ex.response.text;
  }
  return result;
}
