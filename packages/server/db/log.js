const mongoose = require("mongoose");
const { Schema } = mongoose;
const schema = new Schema({
  operator: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
  },
  type: {
    type: String,
    enum: [
      "UNKNOWN",
      "ARTICLE_BAN",
      "ARTICLE_UNBAN",
      "COMMENT_BAN",
      "USER_BAN",
      "USER_UNBAN",
    ],
    default: "UNKNOWN",
  },
  time: Number,
  article: {
    type: Schema.Types.ObjectId,
    ref: "Article",
  },
  user:{
    type: Schema.Types.ObjectId,
    ref: "User",
  }
});
module.exports = mongoose.model("Log", schema);
