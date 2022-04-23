const mongoose = require("mongoose");
const { Schema } = mongoose;
const schema = new Schema({
  userName: String,
  password: String,
  logs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Log",
    },
  ],
});
module.exports = mongoose.model("Admin", schema);
