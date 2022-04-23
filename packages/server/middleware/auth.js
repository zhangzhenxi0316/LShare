var jwt = require("jsonwebtoken");
let secrect = "qwert";

const auth = (req, res, next) => {
  const userId =
    (req.cookies.jwt && jwt.verify(req.cookies.jwt, secrect).user_id) || "";
  if (!userId) {
    res.json({ code: 500, message: "没有登陆" });
    res.end();
    return;
  }
  next();
};
module.exports = auth;
