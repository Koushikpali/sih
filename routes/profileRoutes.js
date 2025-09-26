const express = require("express");
const router = express.Router();
const { getProfile, updateProfile, addProfileData } = require("../controllers/profileController");
const { authenticateUser, authorizeRole } = require("../middleware/authMiddleware");


router.get("/:userId", authenticateUser, getProfile);
router.put("/:userId",authenticateUser, updateProfile);


//prof
router.put(
  "/:userId/add-data",
  authenticateUser,
  authorizeRole("admin", "faculty"), // only admin or faculty can add
  addProfileData
);

module.exports = router;
