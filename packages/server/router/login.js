const express = require("express");
var jwt = require("jsonwebtoken");
const { createTextChangeRange } = require("typescript");
const { UserModel, ObjectId } = require("../db");
const router = express.Router();

// 生成token
let secrect = "qwert";
function generateToken(id) {
  return jwt.sign(
    {
      user_id: id,
    },
    secrect
  );
}
// admin登陆接口

// 登陆接口
router.post("/login", async (req, res) => {

  const { username, password } = req.body;
  const user = await UserModel.findOne({ userName: username });
  if (!user) {
    //   新用户
    const _id = ObjectId();
    const service = new UserModel({
      _id,
      nickName: `用户${_id}`,
      userName: username,
      password: password,
      avatarUrl:
        "https://static01.imgkr.com/temp/449bd04133564f6691ac7d57ed0f0f83.svg",
      description: "编辑个性签名会让你更加有魅力",
      followers: [],
      followings: [],
      isDiggArtcileId: [],
      postIds: [],
    });
    const userItem = await service.save();
    res.cookie("jwt", generateToken(_id), { maxAge: 24 * 60 * 60 * 1000 });
    res.status = 200;
    res.json({ code: 200, message: "新用户注册成功", user: userItem });
    return;
  } else {
    //   老用户
    if (user.password === password) {
      res.cookie("jwt", generateToken(user._id), { maxAge: 30 * 60 * 1000 });
      res.json({ code: 200, message: "登陆成功", user });
    } else {
      res.json({ code: 400, message: "用户名已经注册并且密码不正确" });
    }
  }
});

// 验证登陆是否失效
router.get("/login/isValidate", async (req, res) => {
  try {

    const user_id =
      req.cookies.jwt && jwt.verify(req.cookies.jwt, secrect).user_id;

    if (user_id) {
      res.json({ code: 200, message: "ok", user_id });
      res.end();
      return;
    } else {
      res.json({ code: 500, message: "登陆过期" });
      return;
    }
  } catch (error) {
    console.log("error--", error);
  }
});

router.post("/logout", async (req, res) => {
  res.clearCookie("jwt");
  res.json({ code: 200, message: "退出成功" });
});
module.exports = router;
