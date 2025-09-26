const Workshop = require("../models/SeminarsAndWorkshop");
const { awardPoints } = require("./gamificationController");
//all prof
// ➕ Add Workshop
exports.addWorkshop = async (req, res, next) => {
  try {
    const workshop = await Workshop.create({ ...req.body, userId: req.user.id });

    // Add gamification points
    await awardPoints(req.user.id, "workshop");

    res.status(201).json({ success: true, workshop });
  } catch (err) {
    next(err);
  }
};

// 📌 Get all workshops for a user
exports.getWorkshopsByUser = async (req, res, next) => {
  try {
    const workshops = await Workshop.find({ userId: req.params.userId });
    res.status(200).json({ success: true, workshops });
  } catch (err) {
    next(err);
  }
};

// ✅ Verify Workshop (admin only)
exports.verifyWorkshop = async (req, res, next) => {
  try {
    const workshop = await Workshop.findById(req.params.workshopId);
    if (!workshop) {
      return res.status(404).json({ success: false, message: "Workshop not found" });
    }
    workshop.verified = true;
    await workshop.save();

    res.status(200).json({ success: true, workshop });
  } catch (err) {
    next(err);
  }
};
