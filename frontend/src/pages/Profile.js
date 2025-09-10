import ProfileCard from "../components/profile/ProfileCard";
import SkillsList from "../components/profile/SkillsList";

export default function Profile() {
  const user = { name: "Vrinda Gupta", department: "CSE", year: "5th" };
  const skills = ["React", "TailwindCSS", "JavaScript"];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">My Profile</h1>
      <ProfileCard user={user} />
      <div>
        <h2 className="text-xl font-bold mb-2">Skills</h2>
        <SkillsList skills={skills} />
      </div>
    </div>
  );
}
