import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/common/ProtectedRoute";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard"; // 👈 create this page
import Projects from "./pages/Projects";
import AddProject from "./pages/AddProject";
import Certificates from "./pages/Certificates";
import AddCertificate from "./pages/AddCertificate";
import AddExperience from "./pages/AddExperience";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import GetCertificate from "./pages/GetCertificate";
import AluminiAgent from "./pages/ALUMINI-AGENT";
import Attendance from "./pages/attendance";
import DocumentUpload from "./pages/document";
import Resume from "./pages/resume";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Student Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Admin Dashboard */}
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/resume" element={<Resume />} />

      {/* Other Routes */}
      <Route
        path="/projects"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <Projects />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-project"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <AddProject />
          </ProtectedRoute>
        }
      />
      <Route
        path="/certificates"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <Certificates />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-certificate"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <AddCertificate />
          </ProtectedRoute>
        }
      />
      <Route
        path="/experience"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <AddExperience />
          </ProtectedRoute>
        }
      />
      <Route
        path="/leaderboard"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <Leaderboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/get-certificate"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <GetCertificate />
          </ProtectedRoute>
        }
      />

      {/* Attendance Route */ }
      <Route
        path="/attendance"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Attendance />
          </ProtectedRoute>
        }
      />
      <Route
        path="/documents"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            {/* Replace with your DocumentUpload component */}
           <DocumentUpload/>
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route
        path="*"
        element={
          <ProtectedRoute allowedRoles={["student", "admin"]}>
            <Login />
          </ProtectedRoute>
        }
      />
      <Route
        path="/Alumini-Agent"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <AluminiAgent />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
