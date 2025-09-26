const { awardPoints } = require('../controllers/gamificationController');

const Experience = require("../models/Experience");

exports.addExperience = async (req, res, next) => {
  try {
    console.log("addExperience called with req.body:", req.body);
    console.log("User:", req.user);
    const exp = await Experience.create({ ...req.body, userId: req.user.id });
    console.log("Created experience:", exp);
    // add gamification points
    const pointsResult = await awardPoints(req.user.id, req.body.type);
    console.log("Award points result:", pointsResult);
    res.status(201).json({ success: true, experience: exp });
  } catch (err) {
    console.log("Error in addExperience:", err);
    next(err);
  }
};

//prof
exports.getExperiences = async (req, res, next) => {
  try {
    console.log("getExperiences called with userId:", req.params.userId);
    const experiences = await Experience.find({ userId: req.params.userId });
    console.log("Found experiences:", experiences);
    res.status(200).json({ success: true, experiences });
  } catch (err) {
    console.log("Error in getExperiences:", err);
    next(err);
  }
};

//prof
exports.verifyExperience = async (req, res, next) => {
  try {
    console.log("verifyExperience called with experienceId:", req.params.experienceId);
    const experience = await Experience.findById(req.params.experienceId);
    console.log("Fetched experience:", experience);
    if (!experience) {
      console.log("Experience not found");
      return res.status(404).json({ success: false, message: "Experience not found" });
    }
    experience.verified = true;
    await experience.save();
    console.log("Verified experience:", experience);
    res.status(200).json({ success: true, experience });
  } catch (err) {
    console.log("Error in verifyExperience:", err);
    next(err);
  }
};