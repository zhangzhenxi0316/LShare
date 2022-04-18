const express = require("express");
const uploadRouter = require("./router/upload");
const app = express();
const bodyParser = require('body-parser');
// const formidable = require('express-formidable')
let cookieParser = require('cookie-parser')
//设置跨域访问
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:9102");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Credentials", true);
  // res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
// app.use(formidable());
app.use('/public', express.static('public'))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({extended: true}))

app.use('/upload',uploadRouter);
app.listen(3000, () => {
  console.log('server start success 3000 port');
});
