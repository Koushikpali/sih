const Profile = require("../models/Profile");
const User = require("../models/User");


exports.getProfile = async (req, res, next) => {
  try {
    console.log("Request user:", req.user);
    const profile = await Profile.findOne({ userId: req.user.id }).populate("userId", "name email role");
    console.log("Fetched profile:", profile);
    if (!profile) {
      console.log("Profile not found for userId:", req.user.id);
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json({ success: true, profile });
  } catch (err) {
    console.log("Error in getProfile:", err);
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const updated = await Profile.findOneAndUpdate(
      { userId: req.params.userId },
      req.body,
      { new: true, runValidators: true }
    );
    res.json({ success: true, profile: updated });
  } catch (err) {
    next(err);
  }
};



//ye prof
const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};
//prof
// Controller function to add academic/fee/document info
exports.addProfileData = async (req, res, next) => {
  try {
    const { userId, academics, fees, documents } = req.body;

    // Find the profile
    let profile = await Profile.findOne({ userId });
    if (!profile) {
      // Create new profile if not exists
      profile = new Profile({ userId });
    }

    // Add or update academics
    if (academics) {
      profile.academics = profile.academics.concat(academics);
    }

    // Add or update fees
    if (fees) {
      profile.fees = profile.fees.concat(fees);
    }

    // Add or update documents
    if (documents) {
      profile.documents = profile.documents.concat(documents);
    }

    await profile.save();
    res.status(200).json({ success: true, profile });
  } catch (err) {
    console.error(err);
    next(err);
  }
};