const express = require("express");
const { UserModel, ArticleModel } = require("../db");
const { isValidateId } = require("../util");
const router = express.Router();
var jwt = require("jsonwebtoken");

let secrect = "qwert";
router.get("/getUserInfo", async (req, res) => {
  console.log(req.query);
  let userId = "";
  const { user_id = "", isSelf = 0 } = req.query;
  if (isSelf) {
    userId =
      (req.cookies.jwt && jwt.verify(req.cookies.jwt, secrect).user_id) || "";
  } else {
    userId = user_id;
  }
  console.log(userId);
  if (!isValidateId(userId)) {
    res.json({ code: 400, message: "用户不存在" });
    return;
  }
  const user = await UserModel.findById(userId);
  if (!user) {
    res.json({ code: 400, message: "用户不存在" });
  } else {
    console.log(user);
    let postsPromise = [];
    user.postIds.forEach((id) => {
      postsPromise.push(ArticleModel.findById(id));
    });
    const posts = await await Promise.all(postsPromise);
    const assginObj = {
      posts,
    };
    const userInfo = Object.assign(JSON.parse(JSON.stringify(user)), assginObj);
    console.log(assginObj, userInfo);
    res.json({ code: 200, message: "查询成功", userInfo });
  }
  return;
});
module.exports = router;
