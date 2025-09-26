const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: String,
  techStack: [String],
  githubLink: String,
  verificationStatus: {
  type: String,
  enum: ["pending", "verified", "rejected"],
  default: "pending"
},
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }]
}, { timestamps: true });

module.exports = mongoose.model("Project", projectSchema);
