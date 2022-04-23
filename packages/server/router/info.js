const express = require("express");
const { UserModel, ArticleModel } = require("../db");
const { isValidateId } = require("../util");
const router = express.Router();
var jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

let secrect = "qwert";

// 获取user信息
router.get("/getUserInfo", auth, async (req, res) => {
  let userId = "";
  const { user_id = "", isSelf = 0 } = req.query;
  if (isSelf) {
    userId =
      (req.cookies.jwt && jwt.verify(req.cookies.jwt, secrect).user_id) || "";
  } else {
    userId = user_id;
  }
  if (!isValidateId(userId)) {
    res.json({ code: 400, message: "用户不存在" });
    return;
  }

  const userInfo = await UserModel.findById(userId)
    .populate({
      path: "posts",
      populate: {
        path: "author",
        select: { password: 0, userName: 0 },
      },
    })
    // .populate('author')
    .exec();
  if (userInfo) {
    res.json({ code: 200, message: "查询成功", userInfo });
  } else {
    res.json({ code: 500, message: "没有此用户" });
  }
  return;
});
module.exports = router;
