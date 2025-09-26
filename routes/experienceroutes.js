// routes/experienceRoutes.js
const express = require("express");
const router = express.Router();
const { addExperience, getExperiences, verifyExperience } = require("../controllers/experience");
const { authenticateUser, authorizeRole } = require("../middleware/authMiddleware");

// Add experience (any logged-in user)
router.post("/", authenticateUser, addExperience);

// Get all experiences of a user
router.get("/:userId", authenticateUser, getExperiences);

// Verify experience (admin)
router.put("/:experienceId/verify", authenticateUser, verifyExperience);

module.exports = router;