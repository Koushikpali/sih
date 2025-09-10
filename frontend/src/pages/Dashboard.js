import Navbar from "../components/common/Navbar";

export default function Dashboard() {
  const user = { name: "Anisha Agrawal", department: "CSE", year: "5th" };
  const skills = ["React", "TailwindCSS", "JavaScript", "Node.js"];
  const projects = [
    { title: "StudentHub", description: "Dashboard app", techStack: "React, Tailwind" },
    { title: "Portfolio", description: "Personal portfolio", techStack: "React, CSS" },
    { title: "Blog App", description: "Blog platform", techStack: "React, Node.js" },
  ];
  const certificates = [
    { title: "React Basics", issuer: "Coursera", status: "Verified" },
    { title: "JS Advanced", issuer: "Udemy", status: "Pending" },
    { title: "CSS Mastery", issuer: "FreeCodeCamp", status: "Verified" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-6 max-w-5xl mx-auto space-y-6 bg-cyan-50 rounded-3xl shadow-lg mt-8">

        <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">
          Welcome, {user.name}!
        </h1>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl p-6 border border-transparent hover:border-cyan-400 hover:scale-105 shadow-inner transition-transform duration-300">
          <div className="h-1 w-full bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-t-3xl mb-4"></div>
          <h2 className="font-bold text-xl mb-2 text-gray-800">Profile Info</h2>
          <p className="text-gray-700">Department: {user.department}</p>
          <p className="text-gray-700">Year: {user.year}</p>
        </div>

        {/* Skills */}
        <div className="bg-white rounded-3xl p-6 border border-transparent hover:border-cyan-400 hover:scale-105 shadow-inner transition-transform duration-300">
          <div className="h-1 w-full bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-t-3xl mb-4"></div>
          <h2 className="font-bold text-xl mb-2 text-gray-800">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, idx) => (
              <span key={idx} className="bg-gradient-to-r from-cyan-400 to-cyan-500 text-white px-3 py-1 rounded-full font-medium shadow-md">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="bg-white rounded-3xl p-6 border border-transparent hover:border-cyan-400 hover:scale-105 shadow-inner transition-transform duration-300">
          <div className="h-1 w-full bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-t-3xl mb-4"></div>
          <h2 className="font-bold text-xl mb-2 text-gray-800">Recent Projects</h2>
          {projects.map((p, idx) => (
            <div key={idx} className="border-b py-2 last:border-b-0 flex flex-col md:flex-row md:justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">{p.title}</h3>
                <p className="text-gray-700">{p.description}</p>
              </div>
              <p className="text-sm text-gray-500 mt-1 md:mt-0">Tech: {p.techStack}</p>
            </div>
          ))}
        </div>

        {/* Certificates */}
        <div className="bg-white rounded-3xl p-6 border border-transparent hover:border-cyan-400 hover:scale-105 shadow-inner transition-transform duration-300">
          <div className="h-1 w-full bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-t-3xl mb-4"></div>
          <h2 className="font-bold text-xl mb-2 text-gray-800">Recent Certificates</h2>
          {certificates.map((c, idx) => (
            <div key={idx} className="flex justify-between items-center py-2 border-b last:border-b-0">
              <div>
                <h3 className="font-semibold text-gray-900">{c.title}</h3>
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
    </div>
  );
}
