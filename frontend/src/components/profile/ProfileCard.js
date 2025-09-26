import { useState } from "react";

export default function ProfileCard({ user }) {
  const [avatarError, setAvatarError] = useState(false);

  const handleAvatarError = () => {
    setAvatarError(true);
  };

  const avatarSrc = avatarError
    ? "https://placehold.co/96x96/60A5FA/ffffff?text=U"
    : user?.avatar || "https://placehold.co/96x96/60A5FA/ffffff?text=U";

  return (
    <div className="bg-white shadow-md rounded-3xl p-6 w-full max-w-sm mx-auto transition-transform duration-300 transform hover:scale-105">
      <img
        src={avatarSrc}
        alt="Profile"
        onError={handleAvatarError}
        className="w-24 h-24 rounded-full mx-auto shadow-lg object-cover"
      />
      <h2 className="text-2xl font-bold text-center mt-4 text-gray-900">{user?.name || "Student Name"}</h2>
      <p className="text-center text-gray-600 mt-1">{user?.department || "Department"}</p>
      <p className="text-center text-gray-600">{user?.year || "Year"}</p>
      <p className="text-center text-gray-600 mt-2">ID: {user?.uid}</p>
    </div>
  );
}