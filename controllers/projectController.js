const Project = require("../models/Project"); // Corrected from Profile

exports.createProject = async (req, res, next) => {
  try {
    console.log("📥 Create Project Request");
    console.log("➡️ req.user:", req.user);
    console.log("➡️ req.body:", req.body);

    const project = await Project.create({ ...req.body, userId: req.user.id });

    console.log("✅ Project Created:", project);

    res.status(201).json({ success: true, project });
  } catch (err) {
    console.error("❌ Create Project Error:", err);
    next(err);
  }
};

exports.getProjectsByUser = async (req, res, next) => {
  try {
    console.log("📥 Get Projects Request");
    console.log("➡️ req.params.userId:", req.user.id);

    const projects = await Project.find({ userId: req.user.id }).populate("userId", "name");

 
    console.log("✅ Projects Found:", projects);

    if (!projects || projects.length === 0) {
      console.warn("⚠️ No projects found for user:", req.user.id);
      return res.status(404).json({ message: "No projects found for this user." });
    }

    res.json({ success: true, projects });
  } catch (err) {
    console.error("❌ Get Projects Error:", err);
    next(err);
  }
};

exports.updateProject = async (req, res, next) => {
  try {
    console.log("📥 Update Project Request");
    console.log("➡️ req.params.projectId:", req.params.projectId);
    console.log("➡️ req.body:", req.body);

    const updated = await Project.findByIdAndUpdate(req.params.projectId, req.body, { new: true });

    console.log("✅ Project Updated:", updated);

    res.json({ success: true, project: updated });
  } catch (err) {
    console.error("❌ Update Project Error:", err);
    next(err);
  }
};

exports.deleteProject = async (req, res, next) => {
  try {
    console.log("📥 Delete Project Request");
    console.log("➡️ req.params.projectId:", req.params.projectId);

    const deleted = await Project.findByIdAndDelete(req.params.projectId);

    if (!deleted) {
      console.warn("⚠️ Project not found:", req.params.projectId);
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    console.log("✅ Project Deleted:", deleted);

    res.json({ success: true, message: "Project deleted" });
  } catch (err) {
    console.error("❌ Delete Project Error:", err);
    next(err);
  }
};
