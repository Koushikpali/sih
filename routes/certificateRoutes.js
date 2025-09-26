const express = require("express");
const router = express.Router();
const { uploadCertificate, getCertificatesByUser, verifyCertificate, bulkUploadCertificates } = require("../controllers/certificateController");
const { authenticateUser, authorizeRole } = require("../middleware/authMiddleware");
const multer = require("multer");
const upload = multer(); // for single file upload
const uploads = multer().array("files"); // for bulk file upload

router.post("/", authenticateUser, upload.single("file"), uploadCertificate);
router.post("/bulk", authenticateUser, authorizeRole("admin"), uploads, bulkUploadCertificates); // The correct line
router.get("/:userId", authenticateUser, getCertificatesByUser);
router.put("/:certId/verify", authenticateUser, authorizeRole("admin"), verifyCertificate);

module.exports = router;