const express = require("express");
// const https = require("https");
const app = express();
// 本地模拟https
// const fs = require("fs");
// const options = {
//   key: fs.readFileSync("C:\\Run the Program\\liveserver_https\\certkey.pem"),
//   cert: fs.readFileSync("C:\\Run the Program\\liveserver_https\\fullchain.pem"),
// };
// https
//   .createServer(options, app)
//   .listen(3456, () => console.log(`App listening on port ${3456}!`));

// 处理history
const history = require("connect-history-api-fallback");
app.use(history());
// 反向代理
const { createProxyMiddleware } = require("http-proxy-middleware");
// 静态资源
app.use(express.static(__dirname + "/dist"));

// 反代
app.use(
  "/prod-api/auth",
  createProxyMiddleware({
    changeOrigin: true,
    target: "http://39.98.123.211:8170/admin/acl",
  })
);
app.use(
  "/prod-api/manager",
  createProxyMiddleware({
    changeOrigin: true,
    target: "http://39.98.123.211:8510/admin",
  })
);

// 监听3645端口
app.listen("3456", (err) => {
  if (err) console.warn(err);
  console.log("尚品汇后台系统运行成功……");
});
