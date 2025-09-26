const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },

  // Personal info
  department: String,
  year: Number,
  skills: [String],
  resumeLink: String,
  portfolioLink: String,

  // Academic records
  academics: [
    {
      semester: Number,
      subjects: [
        {
          name: String,
          marks: Number,
          grade: String
        }
      ],
      gpa: Number,
      markSheetLink: String
    }
  ],

  // Fee records
  fees: [
    {
      semester: Number,
      amountPaid: Number,
      paymentDate: Date,
      receiptLink: String
    }
  ],

  // Additional documents
  documents: [
    {
      type: { type: String, enum: ["marksheet", "certificate", "other"] },
      fileLink: String,
      description: String,
      uploadedAt: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Profile", profileSchema);
