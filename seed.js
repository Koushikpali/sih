// seed.js
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("./models/User");
const Profile = require("./models/Profile");
const Certificate = require("./models/Certificate");
const Experience = require("./models/Experience");
const Project = require("./models/Project");
const Gamification = require("./models/Gamification");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  }
}

async function seed() {
  await connectDB();

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Profile.deleteMany({}),
    Certificate.deleteMany({}),
    Experience.deleteMany({}),
    Project.deleteMany({}),
    Gamification.deleteMany({}),
  ]);

  // 👇 Example real students
  const students = [
    {
      name: "Koushik Pali",
      email: "koushik.pali@example.com",
      password: "Koushik123!",
      department: "CSD",
      year: 2,
      skills: ["Python", "DSA", "React"],
      resumeLink: "https://drive.google.com/file/d/koushik-resume",
      portfolioLink: "https://koushik-portfolio.netlify.app",
    },
    {
      name: "Virnda Sharma",
      email: "virnda.sharma@example.com",
      password: "Virnda123!",
      department: "IT",
      year: 3,
      skills: ["Java", "Spring Boot", "SQL"],
      resumeLink: "https://drive.google.com/file/d/virnda-resume",
      portfolioLink: "https://virnda.dev",
    },
    {
      name: "Arjun Mehta",
      email: "arjun.mehta@example.com",
      password: "Arjun123!",
      department: "ECE",
      year: 4,
      skills: ["C++", "AI/ML", "TensorFlow"],
      resumeLink: "https://drive.google.com/file/d/arjun-resume",
      portfolioLink: "https://arjun-portfolio.com",
    },
  ];

  for (const student of students) {
    const hashedPassword = await bcrypt.hash(student.password, 10);
    const user = await User.create({
      name: student.name,
      email: student.email,
      password: hashedPassword,
      role: "student",
    });

    // Profile
    await Profile.create({
      userId: user._id,
      department: student.department,
      year: student.year,
      skills: student.skills,
      resumeLink: student.resumeLink,
      portfolioLink: student.portfolioLink,
      academics: [
        {
          semester: 1,
          subjects: [
            { name: "Maths", marks: 88, grade: "A" },
            { name: "Programming", marks: 92, grade: "A+" },
          ],
          gpa: 8.7,
          markSheetLink: "https://drive.google.com/file/d/marksheet-sem1",
        },
      ],
      fees: [
        {
          semester: 1,
          amountPaid: 50000,
          paymentDate: new Date("2023-08-01"),
          receiptLink: "https://drive.google.com/file/d/receipt-sem1",
        },
      ],
    });

    // Certificates
    await Certificate.create({
      userId: user._id,
      title: "Full Stack Web Development",
      issuer: "Coursera",
      date: new Date("2024-07-15"),
      fileUrl: "https://drive.google.com/file/d/fullstack-cert",
      verificationStatus: "verified",
      verificationLevel: "institute",
      verifierComments: "Excellent completion",
    });

    // Experience
    await Experience.create({
      userId: user._id,
      title: "Internship at Infosys",
      type: "internship",
      duration: "3 months",
      description: "Worked on backend APIs and database optimization.",
      verificationStatus: "verified",
    });

    // Projects
    await Project.create({
      userId: user._id,
      title: "Roommate Finder App",
      description: "Web app to connect students looking for roommates.",
      techStack: ["Node.js", "React", "MongoDB"],
      githubLink: "https://github.com/example/roommate-finder",
      verificationStatus: "pending",
      tags: [],
    });

    // Gamification
    await Gamification.create({
      userId: user._id,
      points: Math.floor(Math.random() * 500),
      badges: ["First Project", "Internship Completed"],
      rank: Math.floor(Math.random() * 100) + 1,
      breakdown: { certificate: 120, internship: 200, project: 80 },
    });
  }

  console.log("✅ Database seeded successfully!");
  mongoose.connection.close();
}

seed().catch((err) => console.error(err));
