const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: String,
  type: {
    type: String,
    enum: ["internship", "hackathon", "award", "competition", "club_activity", "community_service"]
  },
  duration: String,
  description: String,
  verificationStatus: {
  type: String,
  enum: ["pending", "verified", "rejected"],
  default: "pending"
}


}, { timestamps: true });

module.exports = mongoose.model("Experience", experienceSchema);
