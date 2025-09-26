import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getCertificates } from "../services/certificateService";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Button from "../components/common/Button";

export default function GetCertificate() {
  const { user } = useContext(AuthContext);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchCertificates = async () => {
      try {
        const res = await getCertificates(user._id);
        const certs = Array.isArray(res) ? res : res.data || res.certificates || [];
        setCertificates(certs);
      } catch (err) {
        console.error("Failed to fetch certificates:", err);
        setCertificates([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, [user]);

  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  if (loading) return <p className="text-center mt-10">Loading certificates...</p>;

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
            opacity: {
              value: 0.6,
              random: true,
              anim: { enable: true, speed: 0.5, opacity_min: 0.3, sync: false },
            },
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

      {/* Certificates List */}
      <div className="relative z-10 max-w-4xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">My Certificates</h1>

        {certificates.length === 0 ? (
          <p className="text-center mt-10 text-white/80">No certificates found.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {certificates.map((cert) => (
              <div
                key={cert._id}
                className="bg-white/5 backdrop-blur-lg p-6 rounded-3xl shadow-lg border border-white/20 
                           hover:scale-105 transition-transform duration-300"
              >
                <h2 className="text-xl font-semibold mb-2 text-white">{cert.title}</h2>
                <p className="text-white/80 mb-2">Issued by: {cert.issuer}</p>
                <p className="text-white/70 mb-2">
                  Date: {cert.date ? new Date(cert.date).toLocaleDateString() : "N/A"}
                </p>

                {/* Thumbnail + Button */}
                {cert.fileUrl && (
                  <div className="mt-3">
                    <img
                      src={cert.fileUrl}
                      alt={cert.title}
                      className="w-full h-40 object-cover rounded-xl shadow-md mb-3"
                    />
                    <Button
                      as="a"
                      href={cert.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2"
                    >
                      View Certificate
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
