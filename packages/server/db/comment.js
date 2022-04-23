const mongoose = require("mongoose");
const { Schema } = mongoose;
const schema = new Schema({
  content: String,
  addTime: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  article: {
    type: Schema.Types.ObjectId,
    ref: "Article",
  },
});
module.exports = mongoose.model("Comment", schema);
