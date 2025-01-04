const EligibleBranches = ({ register, errors }) => {
  const btechBranches = [
    "Computer Engineering",
    "Information Technology",
    "Electronics & Communication Engineering",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Production & Industrial Engineering",
    "Civil Engineering",
  ];

  const mtechSpecializations = {
    "Computer Engineering": ["Computer Engineering", "Cyber Security"],
    "Electronics and Communication Engineering": ["Communication Systems"],
    "Electrical Engineering": [
      "Power System",
      "Power Electronics & Drives",
      "Control System",
    ],
    // Add other specializations
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">B.Tech Branches</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {btechBranches.map((branch) => (
            <div key={branch} className="flex items-center">
              <input
                type="checkbox"
                {...register(`eligibleBranches.btech.${branch}`)}
                className="h-4 w-4 text-blue-600"
              />
              <label className="ml-2 text-sm">{branch}</label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">M.Tech Specializations</h3>
        {Object.entries(mtechSpecializations).map(([dept, specs]) => (
          <div key={dept} className="mb-4">
            <h4 className="font-medium mb-2">{dept}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {specs.map((spec) => (
                <div key={spec} className="flex items-center">
                  <input
                    type="checkbox"
                    {...register(`eligibleBranches.mtech.${dept}.${spec}`)}
                    className="h-4 w-4 text-blue-600"
                  />
                  <label className="ml-2 text-sm">{spec}</label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default EligibleBranches;
