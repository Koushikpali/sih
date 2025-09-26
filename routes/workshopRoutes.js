const express = require("express");
const router = express.Router();
const { authenticateUser, authorizeRole } = require("../middleware/authMiddleware");
const { addWorkshop, getWorkshopsByUser, verifyWorkshop } = require("../controllers/workshopController");

// Add workshop
router.post("/", authenticateUser, addWorkshop);

// Get workshops by user
router.get("/:userId", authenticateUser, getWorkshopsByUser);

// Verify workshop (Admin only)
router.put("/:workshopId/verify", authenticateUser, authorizeRole("admin"), verifyWorkshop);

module.exports = router;
