import { useState, useEffect, useContext } from "react";
import Navbar from "../components/common/Navbar";
import Loader from "../components/common/Loader";
import { AuthContext } from "../context/AuthContext";
import { getProfile, updateProfile } from "../services/profileService";
import { getProjects } from "../services/projectService";
import { getCertificates } from "../services/certificateService";
import { getUserStats } from "../services/leaderboardService";
import { showModal } from "../utils/modal";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [skills, setSkills] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!user || !user._id) {
        setLoading(false);
        return;
      }
      try {
        const profileData = await getProfile(user._id);
        const projectsData = await getProjects(user._id);
        const certData = await getCertificates(user._id);
        const statsData = await getUserStats(user._id);

        setProfile(profileData?.profile || null);
        setProjects(projectsData?.projects || []);
        setCertificates(certData?.certificates || []);
        setStats(statsData?.gamification || null);

        // Populate form
        setName(profileData?.profile?.userId?.name || "");
        setDepartment(profileData?.profile?.department || "");
        setYear(profileData?.profile?.year || "");
        setSkills(profileData?.profile?.skills ? profileData.profile.skills.join(", ") : "");
      } catch (err) {
        showModal("Error", err.message || "Failed to fetch dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!user || !user._id) {
      showModal("Error", "User not authenticated.");
      return;
    }
    setIsSaving(true);
    try {
      const updatedData = {
        name,
        department,
        year,
        skills: skills.split(",").map((s) => s.trim()),
      };
      await updateProfile(user._id, updatedData);
      showModal("Success", "Profile updated successfully!");
    } catch (err) {
      showModal("Error", err.message || "Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  if (loading) return <Loader />;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0b1020] via-[#121838] to-[#1b214a] overflow-hidden">
      {/* Glowing particles */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: { enable: true, mode: ["repulse", "bubble"] },
              onClick: { enable: true, mode: "push" },
              resize: true
            },
            modes: {
              repulse: { distance: 120, duration: 0.5 },
              bubble: { distance: 150, size: 6, duration: 0.3, opacity: 1 },
              push: { quantity: 3 }
            }
          },
          particles: {
            number: { value: 70, density: { enable: true, area: 900 } },
            color: { value: ["#6aa1ff", "#63e", "#9b59b6", "#ef4444"] },
            shape: { type: "circle" },
            opacity: { value: 0.6, random: true, anim: { enable: true, speed: 0.5, opacity_min: 0.3, sync: false } },
            size: { value: { min: 2, max: 6 }, random: true },
            links: { enable: true, distance: 140, color: "#6aa1ff", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 1, direction: "none", random: true, straight: false, outModes: { default: "out" } },
            shadow: { enable: true, color: "#6aa1ff", blur: 6 },
            twinkle: { particles: { enable: true, frequency: 0.02, opacity: 1 } }
          },
          detectRetina: true
        }}
        className="absolute inset-0 z-0"
      />

      <Navbar />

      <div className="relative z-10 p-6 max-w-6xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-white text-center mb-6 animate-fadeIn">
          Welcome, {profile?.userId?.name || "User"}!
        </h1>

        {/* Tabs */}
        <div className="flex justify-center space-x-4 mb-6">
          {["dashboard", "personalInfo"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 font-semibold rounded-full transition-all duration-300 ${
                activeTab === tab
                  ? "bg-gradient-to-r from-cyan-400 to-purple-500 text-white shadow-lg"
                  : "bg-white/20 text-white/70 hover:bg-white/30"
              }`}
            >
              {tab === "dashboard" ? "Dashboard" : "Personal Info"}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile Card */}
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 shadow-lg border border-white/20 hover:scale-105 transition-transform duration-300">
              <h2 className="font-bold text-xl mb-2 text-white">Profile Info</h2>
              <p className="text-gray-300">Department: {profile?.department || "N/A"}</p>
              <p className="text-gray-300">Year: {profile?.year || "N/A"}</p>
              <p className="text-gray-300">Points: {stats?.points || 0}</p>
            </div>

            {/* Recent Projects */}
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 shadow-lg border border-white/20 hover:scale-105 transition-transform duration-300">
              <h2 className="font-bold text-xl mb-2 text-white">Recent Projects</h2>
              {(projects || []).length > 0 ? (
                (projects || []).slice(0, 3).map((p, idx) => (
                  <div key={idx} className="border-b py-2 last:border-b-0 flex flex-col md:flex-row md:justify-between">
                    <div>
                      <h3 className="font-semibold text-white">{p.title}</h3>
                      <p className="text-gray-300">{p.description}</p>
                    </div>
                    <p className="text-sm text-gray-400 mt-1 md:mt-0">Tech: {p.techStack}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No projects yet</p>
              )}
            </div>

            {/* Certificates */}
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 shadow-lg border border-white/20 hover:scale-105 transition-transform duration-300 md:col-span-2">
              <h2 className="font-bold text-xl mb-2 text-white">Certificates</h2>
              {(certificates || []).length > 0 ? (
                (certificates || []).slice(0, 3).map((c, idx) => (
                  <div key={idx} className="flex justify-between items-center py-2 border-b last:border-b-0">
                    <div>
                      <h3 className="font-semibold text-white">{c.title}</h3>
                      <p className="text-gray-300">{c.issuer}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full font-medium ${
                      c.verificationStatus === "verified"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                    }`}>
                      {c.verificationStatus}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No certificates yet</p>
              )}
            </div>
          </div>
        )}

        {/* Personal Info Tab */}
        {activeTab === "personalInfo" && (
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-lg border border-white/20 max-w-xl mx-auto animate-fadeIn">
            <h2 className="font-bold text-xl mb-4 text-white text-center">Update Personal Info</h2>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              {[
                { label: "Full Name", value: name, setter: setName, type: "text" },
                { label: "Email", value: email, setter: setEmail, type: "email" },
                { label: "Password", value: password, setter: setPassword, type: "password" },
                { label: "Role", value: role, setter: setRole, type: "select", options: ["student","faculty","admin","college","club"] },
                { label: "Department", value: department, setter: setDepartment, type: "text" },
                { label: "Year", value: year, setter: setYear, type: "number" },
                { label: "Skills (comma-separated)", value: skills, setter: setSkills, type: "text" },
              ].map((field, idx) => (
                <div key={idx}>
                  <label className="block text-sm font-medium text-white">{field.label}</label>
                  {field.type === "select" ? (
                    <select value={field.value} onChange={(e) => field.setter(e.target.value)}
                      className="mt-1 block w-full rounded-md bg-white/10 text-white border border-white/30 shadow-sm focus:border-cyan-400 focus:ring focus:ring-cyan-400 focus:ring-opacity-50">
                      {field.options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  ) : (
                    <input type={field.type} value={field.value} onChange={(e) => field.setter(e.target.value)}
                      className="mt-1 block w-full rounded-md bg-white/10 text-white border border-white/30 shadow-sm focus:border-cyan-400 focus:ring focus:ring-cyan-400 focus:ring-opacity-50"/>
                  )}
                </div>
              ))}
              <button type="submit" disabled={isSaving}
                className="w-full bg-gradient-to-r from-cyan-400 to-purple-500 text-white py-2 rounded-full hover:scale-105 shadow-md transition-transform duration-300 disabled:opacity-50">
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
