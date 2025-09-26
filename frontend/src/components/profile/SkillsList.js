export default function SkillsList({ skills = [] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {skills.length > 0 ? (
        skills.map((skill, index) => (
          <span
            key={index}
            className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm font-medium shadow-sm"
          >
            {skill}
          </span>
        ))
      ) : (
        <p className="text-gray-500">No skills added yet.</p>
      )}
    </div>
  );
}