import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { showModal } from "../../utils/modal";

export default function Navbar() {
  const { token, setToken } = useContext(AuthContext);

  const handleLogout = () => {
    setToken(null);
    window.location.href = "/login"; // Full page reload to login page
  };

  const links = [
    "dashboard",
    "projects",
    "add-project",
    "get-certificate",
    "add-certificate",
    "Experience",
    "leaderboard",
    "portfolio",
    "resume",
    "ALUMINI-AGENT"
  ];

  const handleSpecialClick = (path) => {
    if (path === "portfolio") {
      window.open("https://vrinda-portfolio-wine.vercel.app/", "_blank");
    } else if (path === "resume") {
      showModal("Coming Soon", "Resume page is under development.");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/5 backdrop-blur-lg border border-white/20 shadow-md px-6 py-4 flex justify-between items-center transition-all duration-300">
      {/* Logo */}
      <Link
        to="/dashboard"
        className="font-extrabold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500"
      >
        WELCOME STUDENT
      </Link>

      {/* Navigation Links */}
      {token && (
        <div className="flex items-center space-x-3 md:space-x-4 flex-wrap">
          {links.map((path) => {
            const title = path.replace(/\b\w/g, (l) => l.toUpperCase());

            if (path === "portfolio" || path === "resume") {
              return (
                <button
                  key={path}
                  onClick={() => handleSpecialClick(path)}
                  className="px-4 py-2 rounded-full text-white bg-white/10 backdrop-blur-sm font-medium hover:bg-gradient-to-r from-purple-500 to-cyan-400 hover:scale-105 hover:shadow-md transition transform duration-300"
                >
                  {title}
                </button>
              );
            }

            return (
              <Link
                key={path}
                to={`/${path}`}
                className="px-4 py-2 rounded-full text-white bg-white/10 backdrop-blur-sm font-medium hover:bg-gradient-to-r from-purple-500 to-cyan-400 hover:scale-105 hover:shadow-md transition transform duration-300"
              >
                {title}
              </Link>
            );
          })}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-red-400 to-pink-500 shadow-md hover:scale-105 hover:shadow-xl transition-transform duration-300"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
