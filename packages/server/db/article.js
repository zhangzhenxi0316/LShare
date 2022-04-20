const mongoose = require("mongoose");
const { Schema } = mongoose;
const schema = new Schema({
  title: String,
  content: String,
  addTime: Number,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  covers: [String],
});
module.exports = mongoose.model("Article", schema);
