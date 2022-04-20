const mongoose = require("mongoose");
const { Schema } = mongoose;
const schema = new Schema({
  title: String,
  content: String,
  addTime: Number,
  authorId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  covers: [String],
  author: Object
});
module.exports = mongoose.model("Article", schema);
