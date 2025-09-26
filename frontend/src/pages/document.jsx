import React, { useState } from "react";

const DocumentForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    docType: "",
    document: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("docType", form.docType);
    formData.append("document", form.document);

    // Example: fetch("/api/upload", { method: "POST", body: formData });
    alert("Form submitted!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-cyan-50 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white/30 backdrop-blur-md rounded-3xl shadow-lg p-8 w-full max-w-md border border-white/20"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Upload Document
        </h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">Student Name:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">Email:</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">Document Type:</label>
          <select
            name="docType"
            value={form.docType}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="">Select type</option>
            <option value="Transcript">SEMESTER MARKSHEET</option>
            <option value="Certificate">Certificate</option>
            <option value="ID Card">FEES</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium text-gray-700">Document:</label>
          <input
            type="file"
            name="document"
            accept=".pdf,.doc,.docx,.jpg,.png"
            onChange={handleChange}
            required
            className="w-full px-2 py-1 border rounded-xl"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-full shadow-md hover:scale-105 transition-transform duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DocumentForm;
