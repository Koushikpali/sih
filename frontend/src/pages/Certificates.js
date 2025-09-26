import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
// import { showModal } from "../utils/modal";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useNavigate } from "react-router-dom";


export default function NavbarWithParticles() {
  const { token, setToken } = useContext(AuthContext);
 
const navigate = useNavigate();

  const handleLogout = () => {
    // 1. Clear auth token from context
    setToken(null);

    // 2. Remove token from localStorage
    localStorage.removeItem("token");

    // 3. Navigate to login page
    window.location.href = "/login"; // Full page reload to login page
  };

  const links = [
    "dashboard",
    "projects",
    "add-project",
    "get-certificate",
    "add-certificate",
    "experience",
    "leaderboard",
    "portfolio",
    "resume",
    "ALUMINI-AGENT"
  ];

  const handleSpecialClick = (path) => {
    if (path === "portfolio") {
      window.open("https://vrinda-portfolio-wine.vercel.app/");
    } else if (path === "resume") {
      navigate("/resume");
    }
  };

  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  return (
    <div className="relative min-h-screen">
      {/* TSParticles background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: true },
          background: { color: { value: "#f0f9ff" } },
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
              onClick: { enable: true, mode: "push" },
              resize: true,
            },
            modes: {
              repulse: { distance: 100, duration: 0.4 },
              push: { quantity: 4 },
            },
          },
          particles: {
            color: { value: ["#8b5cf6", "#a78bfa", "#c084fc"] },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.2,
              width: 1,
            },
            collisions: { enable: false },
            move: {
              direction: "none",
              enable: true,
              outModes: { default: "bounce" },
              random: true,
              speed: 1,
              straight: false,
            },
            number: { density: { enable: true, area: 800 }, value: 50 },
            opacity: { value: 0.5 },
            shape: { type: "circle" },
            size: { value: { min: 2, max: 5 } },
          },
          detectRetina: true,
        }}
      />

      {/* Glass navbar */}
      <nav className="sticky top-0 z-50 bg-white/20 backdrop-blur-lg border border-white/30 shadow-lg p-4 flex justify-between items-center transition-all duration-300">
        <Link
          to="/dashboard"
          className="font-extrabold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-800"
        >
          StudentHub
        </Link>

        {token && (
          <div className="flex items-center space-x-4">
            {links.map((path) => {
              if (path === "portfolio" || path === "resume") {
                return (
                  <button
                    key={path}
                    onClick={() => handleSpecialClick(path)}
                    className="px-4 py-2 rounded-full text-gray-800 font-medium hover:text-white hover:shadow-lg hover:scale-105 transition transform duration-300 bg-white/40 backdrop-blur-sm hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-700"
                  >
                    {path.replace(/\b\w/g, (l) => l.toUpperCase())}
                  </button>
                );
              }
              
              return (
                <Link
                  key={path}
                  
                  to={`/${path}`}
                  className="px-4 py-2 rounded-full text-gray-800 font-medium hover:text-white hover:shadow-lg hover:scale-105 transition transform duration-300 bg-white/40 backdrop-blur-sm hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-700"
                >
                  {path.replace(/\b\w/g, (l) => l.toUpperCase())}
                </Link>
              );
            })}
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-purple-600 to-purple-800 shadow-md hover:scale-105 hover:shadow-xl transition-transform duration-300"
            >
              Logout
            </button>
          </div>
        )}
      </nav>
    </div>
  );
}
