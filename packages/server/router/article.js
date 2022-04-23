const express = require("express");
const { UserModel, ArticleModel, ObjectId, CommentModel } = require("../db");
const { isValidateId } = require("../util");
const router = express.Router();
var jwt = require("jsonwebtoken");
let secrect = "qwert";
const auth = require("../middleware/auth");

// feed 消费流
router.get("/getFeed", async (req, res) => {
  try {
    const { skip = 0 } = req.query;
    const userId =
      (req.cookies.jwt && jwt.verify(req.cookies.jwt, secrect).user_id) || "";
    let userInfo = null;
    if (userId) {
      userInfo = await UserModel.findById(userId);
    }
    let articles = await ArticleModel.find()
      .populate("author", { password: 0, userName: 0 })
      .sort({ _id: -1 })
      .limit(10)
      .skip(skip)
      .exec();

    for (let i = 0; i < articles.length; i++) {
      const isDigg = userInfo
        ? userInfo.isDiggArticles.includes(articles[i]._id)
        : false;
      articles[i] = Object.assign(JSON.parse(JSON.stringify(articles[i])), {
        isDigg,
      });
    }
    if (articles.length < 10) {
      res.json({ code: 200, articles, has_more: false });
    } else {
      res.json({ code: 200, articles, has_more: true });
    }
  } catch (error) {
    console.log(error);
    res.json({ code: 400, message: "error" });
  }
});

// 获取某一片文章具体信息
router.get("/getArticleInfo", async (req, res) => {
  const { article_id = "" } = req.query;
  if (!isValidateId(article_id)) {
    res.json({ code: 400, message: "id不符合预期" });
    return;
  }
  const userId =
    (req.cookies.jwt && jwt.verify(req.cookies.jwt, secrect).user_id) || "";
  let userInfo = null;
  if (userId) {
    userInfo = await UserModel.findById(userId);
  }
  const article = await ArticleModel.findById(article_id)
    .populate("author", { password: 0, userName: 0 })
    .populate({ path: "comments", populate: { path: "user" } })
    .exec();

  const isDigg = userInfo
    ? userInfo.isDiggArticles.includes(article_id)
    : false;
  if (article) {
    res.json({
      code: 200,
      message: "查询成功",
      article: Object.assign(JSON.parse(JSON.stringify(article)), {
        isDigg,
      }),
    });
  } else {
    res.json({ code: 400, message: "文章不存在" });
  }
});

// 关注信息
router.post("/like", auth, async (req, res) => {
  try {
    const { is_like, article_id } = req.body;
    let result = is_like;
    const userId =
      (req.cookies.jwt && jwt.verify(req.cookies.jwt, secrect).user_id) || "";
    if (!isValidateId(article_id)) {
      res.json({ code: 400, message: "文章id不对" });
    }
    const [userInfo, articleInfo] = await Promise.all([
      UserModel.findById(userId),
      ArticleModel.findById(article_id),
    ]);
    if (!articleInfo) {
      res.json({ code: 400, message: "文章不存在" });
    }
    if (is_like) {
      if (!userInfo.isDiggArticles.includes(article_id)) {
        userInfo.isDiggArticles.unshift(ObjectId(article_id));
      } else {
        result = is_like;
      }
    }
    if (!is_like) {
      if (userInfo.isDiggArticles.includes(article_id)) {
        userInfo.isDiggArticles.splice(
          userInfo.isDiggArticles.findIndex((item) => item === article_id),
          1
        );
      } else {
        result = !is_like;
      }
    }
    await UserModel.findByIdAndUpdate(userId, {
      $set: {
        isDiggArticles: userInfo.isDiggArticles,
      },
    });
    res.json({ code: 200, message: "success", is_like: result });
  } catch (error) {
    console.log(error);
    res.json({ code: 400, message: `error:${JSON.stringify(error)}` });
  }
});

router.post("/deletePost", auth, async (req, res) => {
  const { article_id } = req.body;
  const userId =
    (req.cookies.jwt && jwt.verify(req.cookies.jwt, secrect).user_id) || "";
  const articleInfo = await ArticleModel.findById(article_id);

  if (String(articleInfo.author) == userId) {
    await ArticleModel.findByIdAndDelete(article_id);
    res.json({ code: 200, message: "删除成功" });
  } else {
    res.json({ code: 400, message: "你不是当前文章的作者不可以删除" });
  }
});
router.post("/comment", auth, async (req, res) => {
  try {
    const { article_id, content } = req.body;
    const _id = new ObjectId();
    const addTime = Date.now();
    const userId =
      (req.cookies.jwt && jwt.verify(req.cookies.jwt, secrect).user_id) || "";
    const [articleInfo,userInfo] = await Promise.all([ArticleModel.findById(article_id),UserModel.findById(userId)]);
    const commentService = CommentModel({
      _id,
      user: ObjectId(userId),
      content,
      addTime,
      article: ObjectId(article_id),
    });
    articleInfo.comments.unshift(_id);
    userInfo.comments.unshift(_id);
    const [_commentInfo, _] = await Promise.all([
      commentService.save(),
      ArticleModel.findByIdAndUpdate(article_id, {
        $set: {
          comments: articleInfo.comments,
        },
      }).exec(),
      UserModel.findByIdAndUpdate(userId,{
        $set:{
          comments: userInfo.comments,
        }
      })
    ]);
    const commentInfo = await CommentModel.findById(_commentInfo._id).populate(
      "user",
      { password: 0, userName: 0 }
    );
    res.json({ code: 200, message: "评论发布成功", comment: commentInfo });
  } catch (error) {
    console.log(error);
    res.json({ code: 400, message: `error：${JSON.stringify(error)}` });
  }
});
router.get("/test", async (req, res) => {
  await ArticleModel.find().update({ $set: { comments: [] } });
  res.json("ok");
});
module.exports = router;
