const express = require("express");
const router = express.Router();
const { verifyItem, getPendingItems } = require("../controllers/verificationController");
const { authenticateUser, authorizeRole } = require("../middleware/authMiddleware");

// Admin verifies an item
router.put("/:model/:id/verify", authenticateUser, authorizeRole("admin"), verifyItem);

// Admin fetches pending items of a type
router.get("/:model/pending", authenticateUser, authorizeRole("admin"), getPendingItems);

module.exports = router;
