const mongoose = require("mongoose");

const workshopSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: String,
  speaker: String,
  venue: String,
  date: Date,
  certificateUrl: String,
  
  verificationStatus: {
  type: String,
  enum: ["pending", "verified", "rejected"],
  default: "pending"
}
}, { timestamps: true });

module.exports = mongoose.model("Workshop", workshopSchema);
