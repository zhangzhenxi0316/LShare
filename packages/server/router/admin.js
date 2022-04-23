const express = require("express");
var jwt = require("jsonwebtoken");
const { createTextChangeRange } = require("typescript");
const {
  UserModel,
  ObjectId,
  AdminModel,
  ArticleModel,
  LogModel,
  CommentModel,
} = require("../db");
const adminAuth = require("../middleware/adminAuth");
const { isValidateId } = require("../util");

const router = express.Router();
// 生成token
let secrect = "admin";
function generateToken(id) {
  return jwt.sign(
    {
      user_id: id,
    },
    secrect
  );
}

// admin登陆接口
router.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  const user = await AdminModel.findOne({ userName, password });
  console.log(userName, password, user);
  if (user) {
    res.cookie("admin", generateToken(user._id), {
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ code: 200, message: "新用户注册成功", user });
    return;
  } else {
    res.json({ code: 400, message: "管理员登陆失败" });
  }
});
// 删除文章
router.post("/article_ban", adminAuth, async (req, res) => {
  const { article_id, ban = false } = req.body;
  const userId =
    (req.cookies.admin && jwt.verify(req.cookies.admin, secrect).user_id) || "";
  const [admin, article] = await Promise.all([
    AdminModel.findById(userId),
    ArticleModel.findById(article_id),
  ]);
  console.log("admin---", userId);
  const _id = new ObjectId();
  const _log = new LogModel({
    _id,
    operator: ObjectId(admin._id),
    type: ban ? "ARTICLE_BAN" : "ARTICLE_UNBAN",
    time: Date.now(),
    article: ObjectId(article_id),
    user: ObjectId(article.author),
  });
  const [log, _] = await Promise.all([
    _log.save(),
    ArticleModel.findByIdAndUpdate(article_id, { $set: { ban } }),
  ]);
  res.json({ code: 200, message: "操作成功", log, ban });
});

router.post("/comment_ban", adminAuth, async (req, res) => {
  const { comment_id, article_id, ban = false } = req.body;
  const adminId =
    (req.cookies.admin && jwt.verify(req.cookies.admin, secrect).user_id) || "";
  const [article] = await Promise.all([ArticleModel.findById(article_id)]);
  const _id = new ObjectId();
  const _log = new LogModel({
    _id,
    operator: ObjectId(adminId),
    type: ban ? "COMMENT_BAN" : "COMMENT_UNBAN",
    time: Date.now(),
    article: ObjectId(article._id),
    user: ObjectId(article.author),
  });
  const [log, _] = await Promise.all([
    _log.save(),
    CommentModel.findByIdAndUpdate(comment_id, { $set: { ban } }),
  ]);
  res.json({ code: 200, message: "操作成功", log, ban });
});

router.post("/user_ban", adminAuth, async (req, res) => {
  const { userId, ban = false } = req.body;
  const adminId =
    (req.cookies.admin && jwt.verify(req.cookies.admin, secrect).user_id) || "";
  const _id = new ObjectId();
  const _log = new LogModel({
    _id,
    operator: ObjectId(adminId),
    type: ban ? "USER_BAN" : "USER_UNBAN",
    time: Date.now(),
    user: ObjectId(userId),
  });
  const [log, $] = await Promise.all([
    _log.save(),
    UserModel.findByIdAndUpdate(userId, { $set: { ban } }),
  ]);
  res.json({ code: 200, message: "ok", ban, log });
});

router.get("/getArticleInfo", adminAuth, async (req, res) => {
  const { article_id = "" } = req.query;
  if (!isValidateId(article_id)) {
    res.json({ code: 400, message: "id不符合预期" });
    return;
  }
  const article = await ArticleModel.findById(article_id)
    .populate("author", { password: 0, userName: 0 })
    .populate({
      path: "comments",
      populate: { path: "user" },
    })
    .exec();

  if (article) {
    res.json({
      code: 200,
      message: "查询成功",
      article,
    });
  } else {
    res.json({ code: 400, message: "文章不存在" });
  }
});
router.get("/getLog", adminAuth, async (req, res) => {
  const log = await LogModel.find().populate("operator",{password:0});
  res.json({ code: 200, message: "ok", log });
});
module.exports = router;
