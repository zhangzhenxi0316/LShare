const express = require("express");
const { UserModel, ArticleModel } = require("../db");
const { isValidateId } = require("../util");
const router = express.Router();
var jwt = require("jsonwebtoken");

let secrect = "qwert";

router.get("/getFeed", async (req, res) => {
  const { skip = 0 } = req.query;
  const articles = await ArticleModel.find()
    .sort({ _id: -1 })
    .limit(10)
    .skip(skip);
  if (articles.length < 10) {
    res.json({ code: 200, articles, has_more: false });
  } else {
    res.json({ code: 200, articles, has_more: true });
  }
});
router.get("/getArticleInfo", async (req, res) => {
  const { article_id = "" } = req.query;
  if (!isValidateId(article_id)) {
    res.json({ code: 400, message: "id不符合预期" });
    return;
  }
  const article = await ArticleModel.findById(article_id);
  if (article) {
    res.json({ code: 200, message: "查询成功", article });
  } else {
    res.json({ code: 400, message: "文章不存在" });
  }
});

module.exports = router;
