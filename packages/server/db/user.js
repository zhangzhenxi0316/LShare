const mongoose = require("mongoose");
const { Schema } = mongoose;
const schema = new Schema({
  userName: String,
  password: String,
  avatarUrl: String,
  description: String,
  followers: [{
    type: Schema.Types.ObjectId,
    ref: "User",
  }],
  followings: [{
    type: Schema.Types.ObjectId,
    ref: "User",
  }],
  posts:[{
    type: Schema.Types.ObjectId,
    ref: "Article",
  }],
  isDiggArticles: [{
    type: Schema.Types.ObjectId,
    ref: "Article",
  }],
});
schema.query.byUserName = function (userName) {
  return this.where({ userName });
};
module.exports = mongoose.model("User", schema);