const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
var jwt = require("jsonwebtoken");
const { ArticleModel, UserModel, ObjectId } = require("../db");

let secrect = "qwert";

var upload = multer({ dest: "public/" });

router.post("/publish", async (req, res) => {
  const { covers = [], title = "", content = "" } = req.body;
  console.log('content---',content)
  const addTime = Date.now();
  const userId =
    (req.cookies.jwt && jwt.verify(req.cookies.jwt, secrect).user_id) || "";
  if (!userId) {
    res.json({ code: 400, message: "登陆过期请重新登陆" });
    return;
  }
  try {
    const _id = new ObjectId();
    const user = await UserModel.findById(userId);
    const articleService = new ArticleModel({
      _id,
      covers,
      title,
      content,
      addTime,
      author: user,
      authorId: userId,
    });
    user.postIds.unshift(_id);
    const [article] = await Promise.all([articleService.save(),user.save()]);
    res.json({ code: 200, message: "发文成功", article });
  } catch (error) {
    console.log(error);
    res.json({ code: 400, message: `发文失败: ${JSON.stringify(error)}` });
  }
});

router.use(upload.any());
router.post("/image", upload.single("file"), (req, res) => {
  const path = req.files[0].path;
  const newFilename = req.files[0].path + ".png";
  fs.rename(path, newFilename, (err) => {
    console.log(err);
  });
  res.json({ url: `http://192.168.0.103:3000/${newFilename}` });
});

module.exports = router;
