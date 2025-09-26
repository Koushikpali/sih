import React, { useState } from "react";
import { uploadCertificate, bulkUploadCertificates } from "../services/certificateService";

export default function CertificateUploader() {
  const [singleFile, setSingleFile] = useState(null);
  const [bulkFiles, setBulkFiles] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSingleUpload = async (e) => {
    e.preventDefault();
    if (!singleFile) return setError("Please select a file to upload.");
    setLoading(true); setMessage(""); setError(null);

    const formData = new FormData();
    formData.append("file", singleFile);

    try {
      const response = await uploadCertificate(formData);
      setMessage(`Single certificate uploaded! Status: ${response.certificate.verificationStatus}`);
    } catch (err) {
      setError("Failed to upload single certificate.");
    } finally {
      setLoading(false);
    }
  };

  const handleBulkUpload = async (e) => {
    e.preventDefault();
    if (bulkFiles.length === 0) return setError("Please select files for bulk upload.");
    setLoading(true); setMessage(""); setError(null);

    const formData = new FormData();
    for (const file of bulkFiles) formData.append("files", file);

    try {
      const response = await bulkUploadCertificates(formData);
      setMessage(`${response.certificates.length} certificates uploaded successfully!`);
    } catch (err) {
      setError("Failed to perform bulk upload.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-white text-center mb-6">Certificate Uploader</h2>

      {/* Single Upload */}
      <div className="bg-white/20 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-white/20 hover:scale-105 transition-transform duration-300">
        <h3 className="text-xl font-bold mb-4 text-gray-900">Single Certificate Upload</h3>
        <form onSubmit={handleSingleUpload} className="space-y-4">
          <input
            type="file"
            onChange={(e) => setSingleFile(e.target.files[0])}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-2 bg-gradient-to-r from-cyan-400 to-cyan-500 text-white rounded-xl hover:scale-105 shadow-md transition-transform duration-300 disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload Single Certificate"}
          </button>
        </form>
      </div>

      {/* Bulk Upload */}
      <div className="bg-white/20 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-white/20 hover:scale-105 transition-transform duration-300">
        <h3 className="text-xl font-bold mb-4 text-gray-900">Admin Bulk Upload</h3>
        <form onSubmit={handleBulkUpload} className="space-y-4">
          <input
            type="file"
            multiple
            onChange={(e) => setBulkFiles(Array.from(e.target.files))}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:scale-105 shadow-md transition-transform duration-300 disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Bulk Upload Certificates"}
          </button>
        </form>
      </div>

      {/* Feedback */}
      {error && <p className="text-red-400 text-center font-medium">{error}</p>}
      {message && <p className="text-green-400 text-center font-medium">{message}</p>}
      {loading && <p className="text-gray-200 text-center">Processing...</p>}
    </div>
  );
}
