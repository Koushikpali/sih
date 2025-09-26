import { useState } from "react";
import DataVisualization from "./DataVisualisation";
import FindStudent from "./FindStudent";
import CertificateUploader from "./CertificateUploader";
import StudentRequests from "./StudentRequests";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Attendance from "./attendance";
import DocumentUpload from "./document";


export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("data");

  const tabs = [
    { key: "data", label: "Data Visualization" },
    { key: "find", label: "Find by Student" },
    { key: "certificates", label: "Certificate Uploader" },
    { key: "requests", label: "Student Requests" },
    { key: "attendance", label: "Attendance" },
    { key: "documents", label: "Document Upload" },
  ];

  const particlesInit = async (engine) => await loadFull(engine);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0b1020] via-[#121838] to-[#1b214a] overflow-hidden">
      {/* Glowing Particles */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" }, resize: true },
            modes: { repulse: { distance: 120, duration: 0.5 } },
          },
          particles: {
            number: { value: 70, density: { enable: true, area: 900 } },
            color: { value: ["#6aa1ff", "#63e", "#9b59b6", "#ef4444"] },
            shape: { type: "circle" },
            opacity: { value: 0.6, random: true },
            size: { value: { min: 2, max: 6 }, random: true },
            links: { enable: true, distance: 140, color: "#6aa1ff", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 1, direction: "none", random: true },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 z-0"
      />

      {/* Header */}
      <div className="relative z-10 p-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span className="text-white/80">Welcome, Admin</span>
         
        </div>
      </div>

      {/* Tabs */}
      <div className="relative z-10 p-6 flex flex-wrap gap-4">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-5 py-2 rounded-2xl font-medium transition transform hover:scale-105 border border-white/20 backdrop-blur-md ${
              activeTab === tab.key
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="relative z-10 p-6 max-w-6xl mx-auto mt-4 bg-white/10 backdrop-blur-lg rounded-3xl shadow-lg border border-white/20">
        {activeTab === "data" && <DataVisualization />}
        {activeTab === "find" && <FindStudent />}
        {activeTab === "certificates" && <CertificateUploader />}
        {activeTab === "requests" && <StudentRequests />}
        {activeTab === "attendance" && <Attendance />}
        {activeTab === "documents" && <DocumentUpload />}
      </div>
    </div>
  );
}
