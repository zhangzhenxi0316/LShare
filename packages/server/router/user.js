const express = require("express");
const { UserModel, ArticleModel } = require("../db");
const { isValidateId } = require("../util");
const router = express.Router();
var jwt = require("jsonwebtoken");

let secrect = "qwert";
router.post("/action", async (req, res) => {
  try {
    const { type = "follow", toUid = "" } = req.body;
    const userId =
      (req.cookies.jwt && jwt.verify(req.cookies.jwt, secrect).user_id) || "";
    if (!userId) {
      res.json({ code: 500, message: "没有登陆" });
      return;
    }
    if (!isValidateId(toUid)) {
      res.json({ code: 400, message: "目标用户不存在" });
      return;
    }
    const [selfUserInfo, toUserInfo] = await Promise.all([
      UserModel.findById(userId),
      UserModel.findById(toUid),
    ]);

    if (type === "follow") {
      selfUserInfo.followings.unshift(
        ...selfUserInfo.followings,
        toUserInfo._id
      );
      toUserInfo.followers.unshift(...selfUserInfo.followers, selfUserInfo._id);
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
    // await Promise.all([selfUserInfo.save(),toUserInfo.save()])
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

router.get("/isFollow", async (req, res) => {
  const { toUid } = req.query;
  const userId =
    (req.cookies.jwt && jwt.verify(req.cookies.jwt, secrect).user_id) || "";
  if (!userId) {
    res.json({ code: 400, message: "未登陆" });
    return;
  }
  const userInfo = await UserModel.findById(userId);
  const isFollow = userInfo.followings.includes(toUid);
  res.json({ code: 200, message: "查询成功", isFollow });
});
router.get("/test", async (req, res) => {
  const userInfo = await UserModel.findById("625e975e945f8ea57cc6153c");
  userInfo.followers = [];
  userInfo.followings = [];
  userInfo.save();
  res.send("ok");
});
router.get("/getFollowings", async (req, res) => {
  const userId =
    (req.cookies.jwt && jwt.verify(req.cookies.jwt, secrect).user_id) || "";
  if (!userId) {
    res.json({ code: 500, message: "没有登陆" });
  }
  const userInfo = await UserModel.findById(userId);
  const followingsPromise = [];
  userInfo.followings.forEach((item) => {
    followingsPromise.push(UserModel.findById(item));
  });
  let followings = await Promise.all(followingsPromise);
  res.json({ code: 200, message: "查询成功", followings });
});
router.get("/getFollowers", async (req, res) => {
    const userId =
      (req.cookies.jwt && jwt.verify(req.cookies.jwt, secrect).user_id) || "";
    if (!userId) {
      res.json({ code: 500, message: "没有登陆" });
    }
    const userInfo = await UserModel.findById(userId);
    const followersPromise = [];
    userInfo.followers.forEach((item) => {
        followersPromise.push(UserModel.findById(item));
    });
    let followers = await Promise.all(followersPromise);
    res.json({ code: 200, message: "查询成功", followers });
  });
module.exports = router;
