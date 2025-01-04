const ContactDetails = ({ register, errors }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Point of Contact Details</h3>

      {[1, 2].map((index) => (
        <div key={index} className="border p-4 rounded-lg">
          <h4 className="font-medium mb-4">Contact Person {index}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                {...register(`pointOfContact.${index}.name`)}
                className="mt-1 w-full rounded-md border-gray-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Designation</label>
              <input
                type="text"
                {...register(`pointOfContact.${index}.designation`)}
                className="mt-1 w-full rounded-md border-gray-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Mobile Number</label>
              <input
                type="tel"
                {...register(`pointOfContact.${index}.mobile`)}
                className="mt-1 w-full rounded-md border-gray-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                {...register(`pointOfContact.${index}.email`)}
                className="mt-1 w-full rounded-md border-gray-300"
              />
            </div>
          </div>
        </div>
      ))}

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Additional Information</h3>

        <div>
          <label className="block text-sm font-medium">
            Does your organization sponsor events?
          </label>
          <textarea
            {...register("additionalInfo.sponsorEvents")}
            className="mt-1 w-full rounded-md border-gray-300"
            rows={2}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Interest in offering internships?
          </label>
          <textarea
            {...register("additionalInfo.internshipOffered")}
            className="mt-1 w-full rounded-md border-gray-300"
            rows={2}
          />
        </div>
      </div>
    </div>
  );
};
export default ContactDetails;
