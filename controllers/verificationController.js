const Certificate = require("../models/Certificate");
const Experience = require("../models/Experience");
const Workshop = require("../models/SeminarsAndWorkshop");
const Project = require("../models/Project");
const { awardPoints } = require("./gamificationController");


//prof
// Map modelName -> Model
const models = {
  certificate: Certificate,
  experience: Experience,
  workshop: Workshop,
  project: Project,
};

// Generic verify function
exports.verifyItem = async (req, res, next) => {
  try {
    const { model, id } = req.params; // model = "certificate" | "experience" | "workshop" | "project"
    const { status, comments } = req.body;

    // Ensure valid model
    const Model = models[model];
    if (!Model) {
      return res.status(400).json({ success: false, message: "Invalid model type" });
    }

    // Find the item
    const item = await Model.findById(id);
    if (!item) {
      return res.status(404).json({ success: false, message: `${model} not found` });
    }

    // Update verification fields
    item.verificationStatus = status;
    item.verifierComments = comments || "";
    await item.save();

    // Award points if verified
    if (status === "verified") {
      await awardPoints(item.userId, model, item.verificationLevel || "institute");
    }

    res.status(200).json({ success: true, [model]: item });
  } catch (err) {
    next(err);
  }
};

// Fetch pending items (admin use)
exports.getPendingItems = async (req, res, next) => {
  try {
    const { model } = req.params;
    const Model = models[model];
    if (!Model) {
      return res.status(400).json({ success: false, message: "Invalid model type" });
    }

    const pendingItems = await Model.find({ verificationStatus: "pending" });
    res.status(200).json({ success: true, items: pendingItems });
  } catch (err) {
    next(err);
  }
};
