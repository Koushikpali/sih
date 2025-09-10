import Navbar from "../components/common/Navbar";
import { useState } from "react";

export default function AddCertificate() {
  const [title, setTitle] = useState("");
  const [issuer, setIssuer] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file");
    alert("Certificate uploaded (frontend placeholder)");
    setTitle(""); setIssuer(""); setFile(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-lg p-6 max-w-md mx-auto mt-8 border border-transparent hover:border-cyan-400 hover:scale-105 transition-transform duration-300"
      >
        <div className="h-1 w-full bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-t-3xl mb-6"></div>
        <h1 className="text-2xl font-bold mb-6 text-gray-900 text-center">Upload Certificate</h1>

        <input
          type="text"
          placeholder="Certificate Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mb-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
          required
        />

        <input
          type="text"
          placeholder="Issuer"
          value={issuer}
          onChange={(e) => setIssuer(e.target.value)}
          className="border p-2 mb-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
          required
        />

        <input
          type="file"
          accept=".pdf,.jpg,.png"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2 mb-6 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
          required
        />

        <button className="w-full bg-gradient-to-r from-cyan-400 to-cyan-500 text-white py-2 rounded-full hover:scale-105 shadow-md transition-transform duration-300">
          Upload Certificate
        </button>
      </form>
    </div>
  );
}
