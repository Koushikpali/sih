import Navbar from "../components/common/Navbar";

export default function Leaderboard() {
  const leaderboard = [
    { name: "Anisha Agrawal", points: 120 },
    { name: "Bobby Singh", points: 100 },
    { name: "Vaibhavi Yadhav", points: 80 },
    { name: "Charu Sharma", points: 70 },
    { name: "Devendra Gupta", points: 60 },
  ];

  const getRankGradient = (rank) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-300 to-yellow-400"; // Gold
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-400"; // Silver
      case 3:
        return "bg-gradient-to-r from-amber-300 to-amber-400"; // Bronze
      default:
        return "bg-cyan-100"; // Other ranks
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="p-6 max-w-2xl mx-auto mt-8 bg-cyan-50 rounded-3xl shadow-lg">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600 text-center mb-6">
          Leaderboard
        </h1>

        {leaderboard.map((user, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center bg-white rounded-3xl p-4 border border-transparent hover:border-cyan-400 hover:scale-105 shadow-md transition-transform duration-300 mb-3"
          >
            <div className="flex items-center space-x-3">
              {/* Circle with gradient per rank */}
              <div className="relative">
                <div className={`w-12 h-12 rounded-full ${getRankGradient(idx + 1)}`}></div>
                <div className="absolute inset-0 flex items-center justify-center font-bold text-gray-900">
                  {idx + 1}
                </div>
              </div>
              <span className="font-semibold text-gray-900">{user.name}</span>
            </div>
            <span className="text-gray-700 font-medium">{user.points} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
}
