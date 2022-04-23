const express = require("express");
const { UserModel, ArticleModel, ObjectId } = require("../db");
const { isValidateId } = require("../util");
const router = express.Router();
var jwt = require("jsonwebtoken");
const user = require("../db/user");
const auth = require("../middleware/auth");

let secrect = "qwert";

// 关注行为
router.post("/action", auth, async (req, res) => {
  try {
    const { type = "follow", toUid = "" } = req.body;
    const userId =
      (req.cookies.jwt && jwt.verify(req.cookies.jwt, secrect).user_id) || "";
    if (!isValidateId(toUid)) {
      res.json({ code: 400, message: "目标用户不存在" });
      return;
    }
    const [selfUserInfo, toUserInfo] = await Promise.all([
      UserModel.findById(userId),
      UserModel.findById(toUid),
    ]);

    if (type === "follow") {
      if (!selfUserInfo.followings.includes(toUserInfo._id)) {
        selfUserInfo.followings.unshift(ObjectId(toUserInfo._id));
      }
      if (!toUserInfo.followers.includes(selfUserInfo._id)) {
        toUserInfo.followers.unshift(ObjectId(selfUserInfo._id));
      }
      let a = UserModel.findByIdAndUpdate(userId, {
        $set: {
          followings: selfUserInfo.followings,
        },
      });
      let b = UserModel.findByIdAndUpdate(toUid, {
        $set: {
          followers: toUserInfo.followers,
        },
      });

      await Promise.all([a, b]);
    }

    if (type === "unfollow") {
      const follingIndex = selfUserInfo.followings.findIndex(
        (item) => item === toUid
      );
      follingIndex !== -1 && selfUserInfo.followings.splice(follingIndex, 1);

      const followerIndex = toUserInfo.followers.findIndex(
        (item) => item === userId
      );
      followerIndex !== -1 && toUserInfo.followers.splice(followerIndex, 1);

      let a = UserModel.findByIdAndUpdate(userId, {
        $set: {
          followings: selfUserInfo.followings,
        },
      });
      let b = UserModel.findByIdAndUpdate(toUid, {
        $set: {
          followers: toUserInfo.followers,
        },
      });
      await Promise.all([a, b]);
    }
    res.send({
      code: 200,
      message: "success",
      isFollow: type === "follow" ? "follow" : "unfollow",
    });
  } catch (error) {
    console.log(error);
    res.send({ code: 400, message: `error: ${JSON.stringify(error)}` });
  }
});
// 判断是否关注
router.get("/isFollow", auth, async (req, res) => {
  const { toUid } = req.query;
  const userId =
    (req.cookies.jwt && jwt.verify(req.cookies.jwt, secrect).user_id) || "";
  const userInfo = await UserModel.findById(userId);
  const isFollow = userInfo.followings.includes(toUid);
  res.json({ code: 200, message: "查询成功", isFollow });
});
// 获取关注列表
router.get("/getFollowings", auth, async (req, res) => {
  const userId =
    (req.cookies.jwt && jwt.verify(req.cookies.jwt, secrect).user_id) || "";
  const userInfo = await UserModel.findById(userId)
    .populate("followings", { password: 0, userName: 0 })
    .exec();
  if (!userInfo) {
    res.json({ code: 400, message: "用户不存在" });
    return;
  }

  res.json({ code: 200, message: "查询成功", followings: userInfo.followings });
});

// 粉丝列表
router.get("/getFollowers", auth, async (req, res) => {
  const userId =
    (req.cookies.jwt && jwt.verify(req.cookies.jwt, secrect).user_id) || "";
  const userInfo = await UserModel.findById(userId)
    .populate("followers", { password: 0, userName: 0 })
    .exec();
  if (!userInfo) {
    res.json({ code: 400, message: "用户不存在" });
    return;
  }
  res.json({ code: 200, message: "查询成功", followers: userInfo.followers });
});
// 用户关注的人的文章推荐
router.get("/getUserFollowArticle", auth, async (req, res) => {
  const { skip = 0 } = req.query;
  const limit = 10;
  const userId =
    (req.cookies.jwt && jwt.verify(req.cookies.jwt, secrect).user_id) || "";
  const userInfo = await UserModel.findById(userId);
  const PromiseArr = [];
  userInfo.followers.forEach((item) => {
    PromiseArr.push(
      UserModel.findById(item)
        .populate({
          path: "posts",
          populate: { path: "author", select: { password: 0, userName: 0 } },
        })
        .exec()
    );
  });
  const users = await Promise.all(PromiseArr);
  let skipReal = 0;
  let data = [];
  for (let i = 0; i < users.length; i++) {
    if (data.length >= limit) break;
    if (users[i].posts.length < skip) {
      skipReal = users[i].posts.length;
      continue;
    }
    const posts = users[i].posts;
    for (let j = 0; j < posts.length; j++) {
      data.push(posts[j]);
      skipReal++;
    }
  }
  res.send({ code: 200, message: "查询成功", articles: data });
});

// 用户点赞的文章
router.get("/getUserLikeArticle", auth, async (req, res) => {
  const { skip = 0 } = req.query;
  const userId =
    (req.cookies.jwt && jwt.verify(req.cookies.jwt, secrect).user_id) || "";
  const userInfo = await UserModel.findById(userId)
    .populate({
      path: "isDiggArticles",
      populate: { path: "author" },
    })
    .limit(10)
    .skip(skip)
    .exec();
  if (!userInfo) {
    res.json({ code: 400, message: "用户不存在" });
    return;
  }
  res.json({ code: 200, message: "查询成功", data: userInfo.isDiggArticles });
});

router.get("/articleIsMine", auth, async (req, res) => {
  const { article_id } = req.query;
  const userId =
    (req.cookies.jwt && jwt.verify(req.cookies.jwt, secrect).user_id) || "";
  if (!isValidateId(article_id)) {
    res.json({ code: 400, message: "article id不正确" });
    res.end();
    return;
  }
  const articleInfo = await ArticleModel.findById(article_id);

  if (String(articleInfo.author) === userId) {
    res.json({ code: 200, message: "yes" });
  } else {
    res.end();
  }
});

module.exports = router;
