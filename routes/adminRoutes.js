const express = require("express");
const router = express.Router();

const { findStudent } = require("../controllers/studentController");
const { getPendingRequests, updateRequestStatus } = require("../controllers/requestController");
const { authenticateUser, authorizeRole } = require("../middleware/authMiddleware");
const {
    uploadCertificate,
    getCertificatesByUser ,
} = require("../controllers/certificateController");

// Dashboard
// Student Search
router.get("/find-student", authenticateUser, authorizeRole("admin"), findStudent);

// Certificates
router.post("/upload-certificate", authenticateUser, authorizeRole("admin"), uploadCertificate);
router.get("/certificates/:studentId", authenticateUser, authorizeRole("admin"), getCertificatesByUser );//this is line 18

// Requests
router.get("/pending-requests", authenticateUser, authorizeRole("admin"), getPendingRequests);
router.put("/update-request/:requestId", authenticateUser, authorizeRole("admin"), updateRequestStatus);

module.exports = router;
