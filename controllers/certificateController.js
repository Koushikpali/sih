const axios = require("axios");
const Certificate = require("../models/Certificate");
const uploadToCloudinary = require("../utilities/uploadImage");
const { awardPoints } = require("./gamificationController");

// Upload + ML Verification + Gamification
exports.uploadCertificate = async (req, res, next) => {
  try {
    // ✅ 1. Ensure file was uploaded
    if (!req.file) {
      return res.status(400).json({ success: false, error: "No file uploaded" });
    }

    // ✅ 2. Extract file buffer
    const fileBuffer = req.file.buffer;

    // ✅ 3. Upload to Cloudinary (or your storage)
    const uploadRes = await uploadToCloudinary(fileBuffer, "certificates");

    // ✅ 4. Dummy ML verification (simulate external check)
    const mlResponse = {
      data: {
        status: "verified"
      }
    };

    // ✅ 5. Create certificate record
    const cert = await Certificate.create({
      userId: req.user.id,                       // from authenticateUser middleware
      title: req.body.title || "Untitled",        // fallback to avoid null
      issuer: req.body.issuer || "Unknown",
      date: req.body.date || new Date(),
      fileUrl: uploadRes.secure_url,
      verificationStatus: mlResponse.data.status || "pending",
      verificationLevel: req.body.verificationLevel || "institute"
    });

    // ✅ 6. Award points if verified
    if (cert.verificationStatus === "verified") {
      await awardPoints(req.user.id, "certificate", cert.verificationLevel);
    }

    // ✅ 7. Send response
    res.status(201).json({ success: true, certificate: cert });

  } catch (err) {
    console.error("Upload Error:", err);
    next(err);
  }
};


exports.getCertificatesByUser = async (req, res, next) => {
  try {
    const certificates = await Certificate.find({ userId: req.user.id });
    res.status(200).json({ success: true, certificates });
  } catch (err) {
    next(err);
  }
};



// **Admin Verification**
exports.verifyCertificate = async (req, res, next) => {
  try {
    const { certId } = req.params;
    const { status, comments } = req.body;

    const certificate = await Certificate.findById(certId);
    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }
    
    const originalStatus = certificate.verificationStatus;

    certificate.verificationStatus = status;
    certificate.verifierComments = comments || "";
    await certificate.save();

    // Only award points if the status is changing to 'verified' for the first time
    if (status === "verified" && originalStatus !== "verified") {
      await awardPoints(certificate.userId, "certificate", certificate.verificationLevel);
    }

    res.status(200).json({ success: true, certificate, message: "Certificate status updated." });
  } catch (err) {
    next(err);
  }
};

// **New: Admin Bulk Upload**
exports.bulkUploadCertificates = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "No files uploaded" });
    }

    const uploadedCertificates = [];
    
    // Process each file in the bulk upload
    for (const file of req.files) {
      const uploadRes = await uploadToCloudinary(file.buffer, "certificates");

      const cert = await Certificate.create({
        userId: req.user.id,
        title: file.originalname, // Use original file name as title
        issuer: "Admin Upload",
        date: new Date(),
        fileUrl: uploadRes.secure_url,
        verificationStatus: "verified", // Admins' uploads are auto-verified
        verificationLevel: "institute", // Default level, can be customized
      });

      // Award points for each certificate uploaded
      await awardPoints(req.user.id, "certificate", cert.verificationLevel);
      
      uploadedCertificates.push(cert);
    }

    res.status(201).json({ 
      success: true, 
      certificates: uploadedCertificates, 
      message: `${uploadedCertificates.length} certificates uploaded and verified.` 
    });
  } catch (err) {
    next(err);
  }
};