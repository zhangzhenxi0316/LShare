const mongoose = require("mongoose");
const {
  Types: { ObjectId },
} = mongoose;
const UserModel = require("./user");
const ArticleModel = require("./Article");
module.exports = { ObjectId, UserModel, ArticleModel };
