// server.js
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimiter = require("./middleware/rateLimiter");
const requestLogger = require("./middleware/loggingMiddleware");
const errorHandler = require("./middleware/errorMiddleware");

// Load environment variables
dotenv.config();
console.log("✅ Environment variables loaded.");

// Initialize Express app
const app = express();
console.log("✅ Express app initialized.");

// Connect to MongoDB
connectDB()
  .then(() => console.log("✅ Database connected successfully."))
  .catch((err) => console.error("❌ Database connection error:", err));

// ------------------ MIDDLEWARE ------------------

// Enable CORS for frontend
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
console.log("✅ CORS middleware enabled.");

// Parse JSON request bodies
app.use(express.json());
console.log("✅ JSON parser middleware enabled.");

// Security headers
app.use(helmet());
console.log("✅ Helmet security middleware enabled.");

// HTTP request logging
app.use(morgan("dev"));
console.log("✅ Morgan logging middleware enabled.");

// Custom request logger
app.use(requestLogger);
console.log("✅ Custom request logger middleware enabled.");

// Rate limiter applied to auth routes
// (Optional: you can apply to other sensitive routes too)

// ------------------ ROUTES ------------------
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const certificateRoutes = require("./routes/certificateRoutes");
const projectRoutes = require("./routes/projectRoutes");
const gamificationRoutes = require("./routes/gamificationRoutes");
const adminRoutes = require("./routes/adminRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const experienceRoutes = require("./routes/experienceroutes");
const verificationRoutes = require("./routes/verificationRoutes");
const workshopRoutes = require("./routes/workshopRoutes");

// Use routes
app.use("/api/auth", rateLimiter, authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/gamification", gamificationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/experiences", experienceRoutes);
app.use("/api/workshops", workshopRoutes);
app.use("/api/verify", verificationRoutes);

console.log("✅ All routes configured.");

// ------------------ ERROR HANDLING ------------------
app.use(errorHandler);
console.log("✅ Error handling middleware enabled.");

// ------------------ START SERVER ------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
