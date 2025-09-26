const User = require("../models/User");
const Profile = require("../models/Profile");
const Certificate = require("../models/Certificate");
const Experience = require("../models/Experience");
const Project = require("../models/Project");
const Gamification = require("../models/Gamification");

exports.findStudent = async (req, res, next) => {
    try {
        const query = req.query.query; // e.g., ?query=john@example.com
        console.log("Received query:", query);

        if (!query || typeof query !== "string" || !query.trim()) {
            console.log("Invalid query parameter");
            return res.status(400).json({ success: false, message: "Query parameter is required" });
        }

        // Find the user by name or email
        const student = await User.findOne({
            $or: [
                { name: { $regex: query, $options: "i" } },
                { email: { $regex: query, $options: "i" } },
            ],
        }).select("-password"); // Exclude the password field
        console.log("Student found:", student);

        if (!student) {
            console.log("Student not found");
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        const userId = student._id;
        console.log("User ID:", userId);

        // Find all related data from other models using the userId
        const [profile, certificates, experiences, projects, gamification] = await Promise.all([
            Profile.findOne({ userId }),
            Certificate.find({ userId }),
            Experience.find({ userId }),
            Project.find({ userId }),
            Gamification.findOne({ userId }),
        ]);

        console.log("Profile:", profile);
        console.log("Certificates:", certificates);
        console.log("Experiences:", experiences);
        console.log("Projects:", projects);
        console.log("Gamification:", gamification);

        // Compile all the data into a single response object
        const studentData = {
            user: student,
            profile,
            certificates,
            experiences,
            projects,
            gamification,
        };

        console.log("Compiled student data:", studentData);

        res.json({ success: true, data: studentData });
    } catch (err) {
        console.log("Error:", err);
        next(err);
    }
};