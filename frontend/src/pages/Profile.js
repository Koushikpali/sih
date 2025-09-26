import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { getProfile } from "../services/profileService";
import Loader from "../components/common/Loader";
import Navbar from "../components/common/Navbar";
import ProfileCard from "../components/profile/ProfileCard";
import SkillsList from "../components/profile/SkillsList";
import { showModal } from "../utils/modal";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (user) {
          const { profile: userProfile } = await getProfile(user._id);
          setProfile(userProfile);
        }
      } catch (err) {
        showModal("Error", "Failed to fetch profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0b1020] via-[#121838] to-[#1b214a] overflow-hidden">
      {/* tsParticles Background */}
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

      <div className="relative z-10 p-6 max-w-5xl mx-auto mt-8 space-y-6 bg-white/10 backdrop-blur-md rounded-3xl shadow-lg">
        <h1 className="text-3xl font-bold text-white text-center mb-6">My Profile</h1>

        {/* Profile Card */}
        <div className="hover:scale-105 transition-transform duration-300">
          <ProfileCard user={profile?.userId} />
        </div>

        {/* Skills */}
        <div className="hover:scale-105 transition-transform duration-300">
          <h2 className="text-xl font-bold mb-2 text-white">Skills</h2>
          <SkillsList skills={profile?.skills || []} />
        </div>
      </div>
    </div>
  );
}
