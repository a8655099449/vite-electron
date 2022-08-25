// const Koa = require('koa');

import Koa from "koa";
// const proxy  =  require("http-proxy-middleware");
// const proxy = require('http-proxy-middleware'); //引入代理模块
import k2c from "koa2-connect";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = new Koa();

// app.use();

// @ts-ignore
// const exampleProxy = proxy('/apis/*', proxyOptions); //api前缀的请求都走代理
// app.use(exampleProxy)

app.use(async (ctx, next) => {
  if (ctx.url.startsWith("/apis")) {
    ctx.respond = false;
    await k2c(
      createProxyMiddleware({
        // target: "http://47.107.81.99:3000",
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
        pathRewrite: {
          "^/apis": "",
        },
      })
    )(ctx, next);
  }

  ctx.body = "Hello World";
});

app.listen(3021);
