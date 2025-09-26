const mongoose = require("mongoose");

const gamificationSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true, 
      unique: true 
    },
    points: { type: Number, default: 0 },
    badges: { type: [String], default: [] },
    rank: { type: Number, default: 0 },
    breakdown: { 
      type: Map, // ✅ allows dynamic keys (certificate, hackathon, etc.)
      of: Number,
      default: {}
    },
    lastUpdated: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gamification", gamificationSchema);
