export default function SkillsList({ skills = [] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {skills.length > 0 ? (
        skills.map((skill, index) => (
          <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
            {skill}
          </span>
        ))
      ) : (
        <p className="text-gray-500">No skills added yet</p>
      )}
    </div>
  );
}
