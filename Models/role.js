const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roleSchema = new Schema({
  role: { type: String, required: true },
  created_dt: { type: Date, default: Date.now }
});

const Role = mongoose.Models.Role || mongoose.model("Role", roleSchema);

module.exports = Role;