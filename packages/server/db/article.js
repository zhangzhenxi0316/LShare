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
  comments: [{
      type: Schema.Types.ObjectId,
      ref: "Comment",
    }],
  ban: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("Article", schema);
