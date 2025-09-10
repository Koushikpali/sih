export default function ProfileCard({ user }) {
  return (
    <div className="bg-white shadow-md rounded p-4 w-full max-w-sm">
      <img
        src={user?.avatar || "/assets/default-avatar.png"}
        alt="Profile"
        className="w-24 h-24 rounded-full mx-auto"
      />
      <h2 className="text-xl font-bold text-center mt-2">{user?.name || "Student Name"}</h2>
      <p className="text-center text-gray-500">{user?.department || "Department"}</p>
      <p className="text-center text-gray-500">{user?.year || "Year"}</p>
    </div>
  );
}
