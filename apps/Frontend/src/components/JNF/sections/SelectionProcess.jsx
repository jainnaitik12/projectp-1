const SelectionProcess = ({ register, errors }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium">
            Resume Shortlisting
          </label>
          <div className="mt-2 space-x-4">
            <input
              type="radio"
              {...register("selectionProcess.resumeShortlisting")}
              value="yes"
              className="mr-2"
            />
            <span>Yes</span>
            <input
              type="radio"
              {...register("selectionProcess.resumeShortlisting")}
              value="no"
              className="mr-2"
            />
            <span>No</span>
          </div>
        </div>

        {/* Similar radio groups for other selection steps */}

        <div>
          <label className="block text-sm font-medium">Expected Recruits</label>
          <input
            type="number"
            {...register("selectionProcess.expectedRecruits")}
            className="mt-1 w-full rounded-md border-gray-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Tentative Date</label>
          <input
            type="date"
            {...register("selectionProcess.tentativeDate")}
            className="mt-1 w-full rounded-md border-gray-300"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Other Rounds</label>
        <textarea
          {...register("selectionProcess.otherRounds")}
          className="mt-1 w-full rounded-md border-gray-300"
          rows={3}
        />
      </div>
    </div>
  );
};
export default SelectionProcess;
