const mongoose = require("mongoose");
const {
  Types: { ObjectId },
} = mongoose;
const UserModel = require("./user");
const ArticleModel = require("./Article");
const CommentModel = require("./Comment");
module.exports = { ObjectId, UserModel, ArticleModel, CommentModel };
