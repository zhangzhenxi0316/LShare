var jwt = require("jsonwebtoken");
let secrect = "admin";

const adminAuth = (req, res, next) => {
  const userId =
    (req.cookies.admin && jwt.verify(req.cookies.admin, secrect).user_id) || "";
  if (!userId) {
    res.json({ code: 500, message: "没有登陆" });
    res.end();
    return;
  }
  next();
};
module.exports = adminAuth;
