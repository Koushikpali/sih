import React, { useEffect, useState } from "react";
import { getPendingRequests, updateRequestStatus } from "../services/adminService";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function StudentRequests() {
  const [requests, setRequests] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await getPendingRequests();
      setRequests(response.data);
    } catch (err) {
      setError("Failed to fetch pending requests.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleUpdateStatus = async (type, id, status) => {
    try {
      await updateRequestStatus(type, id, status);
      fetchRequests();
    } catch (err) {
      setError("Failed to update request status.");
      console.error(err);
    }
  };

  if (loading) return <div className="text-center py-8">Loading requests...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  const renderRequests = (list, type) => (
    list.length > 0 ? (
      <ul className="space-y-4">
        {list.map((item) => (
          <li
            key={item._id}
            className="flex justify-between items-center bg-white/30 backdrop-blur-md p-4 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 border border-white/20"
          >
            <div>
              <p className="font-semibold text-gray-900">
                {type === "certificate" ? `${item.title} by ${item.issuer}` : `${item.title} (${item.type})`}
              </p>
              <p className="text-sm text-gray-700">Student: {item.userId.name}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => handleUpdateStatus(type, item._id, "verified")}
                className="p-3 bg-gradient-to-r from-green-400 to-green-500 text-white rounded-full hover:scale-110 hover:from-green-500 hover:to-green-600 transition-transform duration-300"
              >
                <FaCheck size={16} />
              </button>
              <button
                onClick={() => handleUpdateStatus(type, item._id, "rejected")}
                className="p-3 bg-gradient-to-r from-red-400 to-red-500 text-white rounded-full hover:scale-110 hover:from-red-500 hover:to-red-600 transition-transform duration-300"
              >
                <FaTimes size={16} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    ) : <p className="text-gray-500">No pending {type}s found.</p>
  );

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-gray-800">Student Requests</h2>

      {/* Pending Certificates */}
      <div className="bg-white/20 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-white/20">
        <h3 className="text-xl font-bold mb-4 text-purple-700 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-600">
          Pending Certificates
        </h3>
        {renderRequests(requests?.pendingCertificates || [], "certificate")}
      </div>

      {/* Pending Experiences */}
      <div className="bg-white/20 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-white/20">
        <h3 className="text-xl font-bold mb-4 text-purple-700 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-600">
          Pending Experiences
        </h3>
        {renderRequests(requests?.pendingExperiences || [], "experience")}
      </div>
    </div>
  );
}
