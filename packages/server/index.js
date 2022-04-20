const express = require("express");
const uploadRouter = require("./router/upload");
const loginRouter = require("./router/login");
const articleRouter = require("./router/article");
const userRouter = require("./router/user");
const infoRouter = require("./router/info");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const mongoDB = "mongodb://localhost:27017";

mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(
    (res) => {
      console.log("connect success");
    },
    (err) => console.log("connection failed",err)
  );

const app = express();

//设置跨域访问
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:9102");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Credentials", true);
  // res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.use("/public", express.static("public"));
app.use(cookieParser());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(loginRouter)
app.use(infoRouter)
app.use(articleRouter)
app.use(userRouter)
app.use("/upload", uploadRouter);
app.listen(3000, () => {
  console.log("server start success 3000 port");
});
