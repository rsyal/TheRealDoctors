const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const threadSchema = new Schema({
  title: { type: String, required: true },
  user_id: {type: String, required: true },
  created_dt: { type: Date, default: Date.now }
});

const Thread = mongoose.Models.Thread || mongoose.model("Thread", threadSchema);

module.exports = Thread;