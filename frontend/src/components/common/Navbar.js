import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {
  const { token, setToken } = useContext(AuthContext);

  const handleLogout = () => {
    setToken(null);
    alert("Logged out (mock)");
  };

  const links = [
    "dashboard",
    "projects",
    "add-project",
    "certificates",
    "add-certificate",
    "leaderboard",
  ];

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-50">
      <Link to="/dashboard" className="font-bold text-xl text-gray-900">
        StudentHub
      </Link>

      {token && (
        <div className="flex items-center space-x-4">
          {links.map((path) => (
            <Link
              key={path}
              to={`/${path}`}
              className="px-3 py-1 rounded-md hover:bg-cyan-100 text-gray-800 font-medium"
            >
              {path.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="bg-cyan-500 text-white px-3 py-1 rounded-md hover:bg-cyan-600 font-medium shadow-sm"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
