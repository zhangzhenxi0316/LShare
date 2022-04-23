const mongoose = require("mongoose");
const {
  Types: { ObjectId },
} = mongoose;
const UserModel = require("./user");
const ArticleModel = require("./article");
const CommentModel = require("./comment");
const AdminModel = require("./admin");
const LogModel = require("./log");
module.exports = {
  ObjectId,
  UserModel,
  ArticleModel,
  CommentModel,
  AdminModel,
  LogModel,
};
