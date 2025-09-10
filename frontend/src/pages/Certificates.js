import Navbar from "../components/common/Navbar";

export default function Certificates() {
  const certificates = [
    { title: "React Basics", issuer: "Coursera", status: "Verified" },
    { title: "JS Advanced", issuer: "Udemy", status: "Pending" },
    { title: "CSS Mastery", issuer: "FreeCodeCamp", status: "Verified" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-6 max-w-5xl mx-auto space-y-6 bg-cyan-50 rounded-3xl shadow-lg mt-8">

        <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">Certificates</h1>

        {certificates.map((c, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl p-6 border border-transparent hover:border-cyan-400 hover:scale-105 shadow-inner transition-transform duration-300 flex justify-between items-center mb-3"
          >
            <div>
              <h3 className="font-semibold text-gray-900 text-xl">{c.title}</h3>
              <p className="text-gray-700">{c.issuer}</p>
            </div>
            <span className={`px-3 py-1 rounded-full font-medium ${
              c.status === "Verified" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
            }`}>
              {c.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
