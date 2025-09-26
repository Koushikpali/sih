import React, { useState } from "react";
import { findStudent } from "../services/adminService";

export default function FindStudent() {
  const [query, setQuery] = useState("");
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return setError("Please enter a name or email to search.");
    setLoading(true); setError(null); setStudent(null);

    try {
      const response = await findStudent(query);
      setStudent(response.data);
    } catch (err) {
      setError("Student not found or an error occurred.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-white text-center mb-6">Find Student</h2>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex gap-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or email..."
          className="flex-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:scale-105 shadow-md transition-transform duration-300"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Error Message */}
      {error && <div className="text-red-400 text-center font-medium">{error}</div>}

      {/* Student Info */}
      {student && (
        <div className="bg-white/20 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-white/20 hover:scale-105 transition-transform duration-300">
          <h3 className="text-xl font-bold text-gray-900 mb-4">{student.user?.name}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile */}
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-700">Profile</h4>
              <p>Department: {student.profile?.department}</p>
              <p>Skills: {student.profile?.skills?.join(", ")}</p>
            </div>

            {/* Gamification */}
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-700">Gamification</h4>
              <p>Points: {student.gamification?.points}</p>
              <p>Rank: {student.gamification?.rank}</p>
            </div>
          </div>

          {/* Certificates */}
          <div className="mt-4">
            <h4 className="font-semibold text-gray-700">Certificates ({student.certificates?.length})</h4>
            <ul className="list-disc list-inside space-y-1">
              {student.certificates?.map((cert) => (
                <li key={cert._id}>
                  {cert.title} by {cert.issuer} ({cert.verificationStatus})
                </li>
              ))}
            </ul>
          </div>

          {/* Experiences */}
          <div className="mt-4">
            <h4 className="font-semibold text-gray-700">Experiences ({student.experiences?.length})</h4>
            <ul className="list-disc list-inside space-y-1">
              {student.experiences?.map((exp) => (
                <li key={exp._id}>
                  {exp.title} ({exp.status})
                </li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          <div className="mt-4">
            <h4 className="font-semibold text-gray-700">Projects ({student.projects?.length})</h4>
            <ul className="list-disc list-inside space-y-1">
              {student.projects?.map((proj) => (
                <li key={proj._id}>
                  {proj.title} - {proj.techStack?.join(", ")}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
