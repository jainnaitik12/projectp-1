const JobProfiles = ({ register, errors }) => {
  const courses = ["B.Tech", "M.Tech", "MBA", "MCA", "M.Sc", "Ph.D"];

  return (
    <div className="space-y-6">
      {courses.map((course) => (
        <div key={course} className="border p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-4">{course}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">
                Job Designation
              </label>
              <input
                type="text"
                {...register(`jobProfiles.${course}.designation`)}
                className="mt-1 w-full rounded-md border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">CTC (₹)</label>
              <input
                type="number"
                {...register(`jobProfiles.${course}.ctc`)}
                className="mt-1 w-full rounded-md border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Take Home (₹)</label>
              <input
                type="number"
                {...register(`jobProfiles.${course}.takeHome`)}
                className="mt-1 w-full rounded-md border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Place of Posting
              </label>
              <input
                type="text"
                {...register(`jobProfiles.${course}.placeOfPosting`)}
                className="mt-1 w-full rounded-md border-gray-300"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default JobProfiles;
