const CompanyDetails = ({ register, errors }) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Company Name
        </label>
        <input
          type="text"
          {...register("companyDetails.name", { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500"
        />
        {errors.companyDetails?.name && (
          <p className="text-red-500 text-sm mt-1">Company name is required</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            {...register("companyDetails.email", {
              required: true,
              pattern: /^\S+@\S+$/i,
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Website
          </label>
          <input
            type="url"
            {...register("companyDetails.website")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Company Type
        </label>
        <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-4">
          {["MNC", "Start-up", "PSU", "Private", "NGO", "Other"].map((type) => (
            <div key={type} className="flex items-center">
              <input
                type="radio"
                {...register("companyDetails.companyType", { required: true })}
                value={type}
                className="h-4 w-4 text-blue-600"
              />
              <label className="ml-2 text-sm text-gray-700">{type}</label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Company Description
        </label>
        <textarea
          {...register("companyDetails.description")}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>
    </div>
  );
};

export default CompanyDetails;
