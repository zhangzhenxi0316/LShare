const mongoose = require("mongoose");
const { Schema } = mongoose;
const schema = new Schema({
  userName: String,
  password: String,
  avatarUrl: String,
  description: String,
  followers: [String],
  followings: [String],
  postIds:[{
    type: Schema.Types.ObjectId,
    ref: "Article",
  }],
  isDiggArtcileId: [{
    type: Schema.Types.ObjectId,
    ref: "Article",
  }],
});
schema.query.byUserName = function (userName) {
  return this.where({ userName });
};
module.exports = mongoose.model("User", schema);
