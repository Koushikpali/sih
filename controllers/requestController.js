const Certificate = require("../models/Certificate");
const Experience = require("../models/Experience");

exports.getPendingRequests = async (req, res) => {
    console.log("getPendingRequests called");
    try {
        console.log("Fetching pending certificates...");
        const pendingCertificates = await Certificate.find({
            verificationStatus: "pending",
        }).populate("userId", "name email");
        console.log("Pending certificates fetched:", pendingCertificates);

        console.log("Fetching pending experiences...");
        const pendingExperiences = await Experience.find({
            status: "pending",
        }).populate("userId", "name email");
        console.log("Pending experiences fetched:", pendingExperiences);

        res.json({
            success: true,
            data: { pendingCertificates, pendingExperiences },
        });
        console.log("Response sent for getPendingRequests");
    } catch (err) {
        console.error("Error in getPendingRequests:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.updateRequestStatus = async (req, res) => {
    console.log("updateRequestStatus called with body:", req.body);
    try {
        const { type, id, status } = req.body; // type = "certificate" | "experience"
        console.log(`Updating request: type=${type}, id=${id}, status=${status}`);

        let updatedDoc;
        if (type === "certificate") {
            console.log("Updating certificate status...");
            updatedDoc = await Certificate.findByIdAndUpdate(
                id,
                { verificationStatus: status },
                { new: true }
            );
            console.log("Certificate updated:", updatedDoc);
        } else if (type === "experience") {
            console.log("Updating experience status...");
            updatedDoc = await Experience.findByIdAndUpdate(
                id,
                { status },
                { new: true }
            );
            console.log("Experience updated:", updatedDoc);
        }

        if (!updatedDoc) {
            console.warn("Document not found for update.");
            return res.status(404).json({ success: false, message: "Document not found." });
        }

        res.json({ success: true, data: updatedDoc });
        console.log("Response sent for updateRequestStatus");
    } catch (err) {
        console.error("Error in updateRequestStatus:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};