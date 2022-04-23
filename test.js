const express = require("express");
const uploadRouter = require("./router/upload");
// 初始化app实例
const app = express();
// 三方库body-parser中间件用来解析body
const bodyParser = require("body-parser");
app.use(bodyParser.json());
// 自定义中间件
const middleware = (req, res, next) => {
  res.header("Access-Control-Allow-Methods", "*");
  next();
};
// 子路由
app.use("/upload", middleware, uploadRouter);
// 主路由
app.get('/test',(req,res)=>res.send('ok'))
// 开启服务
app.listen(3000, () => {
  console.log("server start success 3000 port");
});
