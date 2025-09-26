import React, { useState } from "react";

const initialStudents = [
  { id: 1, name: "Alice", status: "present" },
  { id: 2, name: "Bob", status: "absent" },
  { id: 3, name: "Charlie", status: "present" },
  { id: 4, name: "David", status: "absent" },
];

function AttendancePage() {
  const [students, setStudents] = useState(initialStudents);

  const toggleStatus = (id) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id
          ? {
              ...student,
              status: student.status === "present" ? "absent" : "present",
            }
          : student
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-cyan-50 flex flex-col items-center p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Attendance</h2>

      <div className="w-full max-w-3xl bg-white/30 backdrop-blur-md rounded-3xl shadow-lg p-6 border border-white/20">
        <table className="w-full table-auto text-left border-collapse">
          <thead>
            <tr className="text-gray-700">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Toggle</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr
                key={student.id}
                className="transition-transform transform hover:scale-105 hover:shadow-xl bg-white/50 backdrop-blur-sm rounded-xl my-1"
              >
                <td className="px-4 py-3 font-medium">{student.name}</td>
                <td
                  className={`px-4 py-3 font-bold ${
                    student.status === "present" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {student.status}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleStatus(student.id)}
                    className={`px-4 py-2 rounded-full text-white font-semibold transition-transform duration-300 transform hover:scale-110 ${
                      student.status === "present"
                        ? "bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600"
                        : "bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600"
                    }`}
                  >
                    Mark {student.status === "present" ? "Absent" : "Present"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AttendancePage;
