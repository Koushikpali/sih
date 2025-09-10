import { useState } from "react";
import Button from "../common/Button";
import { prepareFileUpload } from "../../utils/fileUpload";

export default function CertificateForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [issuer, setIssuer] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file");
    const formData = prepareFileUpload(file);
    formData.append("title", title);
    formData.append("issuer", issuer);
    onSubmit(formData); // frontend placeholder
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-4">Upload Certificate</h2>
      <input
        type="text"
        placeholder="Certificate Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 mb-4 w-full rounded"
        required
      />
      <input
        type="text"
        placeholder="Issuer"
        value={issuer}
        onChange={(e) => setIssuer(e.target.value)}
        className="border p-2 mb-4 w-full rounded"
        required
      />
      <input
        type="file"
        accept=".pdf,.jpg,.png"
        onChange={(e) => setFile(e.target.files[0])}
        className="border p-2 mb-4 w-full rounded"
        required
      />
      <Button type="submit" className="w-full">Upload</Button>
    </form>
  );
}
