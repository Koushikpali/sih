import { useState, useEffect } from "react";
import Navbar from "../components/common/Navbar";
import { getLeaderboard } from "../services/leaderboardService";
import Loader from "../components/common/Loader";
import { showModal } from "../utils/modal";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const { leaderboard: fetchedLeaderboard } = await getLeaderboard();
        setLeaderboard(fetchedLeaderboard);
      } catch (err) {
        showModal("Error", "Failed to fetch leaderboard.");
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  if (loading) {
    return <Loader />;
  }

  const getRankGradient = (rank) => {
    switch (rank) {
      case 1: return "bg-gradient-to-r from-yellow-300 to-yellow-400"; // Gold
      case 2: return "bg-gradient-to-r from-gray-300 to-gray-400"; // Silver
      case 3: return "bg-gradient-to-r from-amber-300 to-amber-400"; // Bronze
      default: return "bg-white/5"; // Glassmorphic effect for others
    }
  };

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
              resize: true,
            },
            modes: {
              repulse: { distance: 120, duration: 0.5 },
              bubble: { distance: 150, size: 6, duration: 0.3, opacity: 1 },
              push: { quantity: 3 },
            },
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
            twinkle: { particles: { enable: true, frequency: 0.02, opacity: 1 } },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 z-0"
      />

      <Navbar />
      <div className="relative z-10 p-6 max-w-2xl mx-auto mt-8 space-y-4">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Leaderboard</h1>
        {leaderboard.length > 0 ? (
          leaderboard.map((user, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center bg-white/5 backdrop-blur-lg rounded-3xl p-4 border border-white/20 hover:scale-105 shadow-lg transition-transform duration-300"
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className={`w-12 h-12 rounded-full ${getRankGradient(idx + 1)}`}></div>
                  <div className="absolute inset-0 flex items-center justify-center font-bold text-gray-900">
                    {idx + 1}
                  </div>
                </div>
                <span className="font-semibold text-white">{user.userId.name}</span>
              </div>
              <span className="text-white font-medium">{user.points} pts</span>
            </div>
          ))
        ) : (
          <p className="text-center text-white/70">No leaderboard data found.</p>
        )}
      </div>
    </div>
  );
}
