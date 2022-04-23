const mongoose = require("mongoose");
const { Schema } = mongoose;
const schema = new Schema({
  userName: String,
  password: String,
});
module.exports = mongoose.model("Admin", schema);
