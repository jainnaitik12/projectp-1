import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CompanyDetails from "./sections/CompanyDetails";
import JobProfiles from "./sections/JobProfiles";
import EligibleBranches from "./sections/EligibleBranches";
import SelectionProcess from "./sections/SelectionProcess";
import ContactDetails from "./sections/ContactDetails";

const JNFForm = () => {
  const [step, setStep] = useState(1);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/jnf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <CompanyDetails register={register} errors={errors} />;
      case 2:
        return <JobProfiles register={register} errors={errors} />;
      case 3:
        return <EligibleBranches register={register} errors={errors} />;
      case 4:
        return <SelectionProcess register={register} errors={errors} />;
      case 5:
        return <ContactDetails register={register} errors={errors} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6">
              Job Notification Form 2024-25
            </h2>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setStep(num)}
                    className={`rounded-full h-12 w-12 flex items-center justify-center
                      ${
                        step >= num ? "bg-blue-600 text-white" : "bg-gray-200"
                      }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {renderStep()}

            <div className="mt-6 flex justify-between">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Previous
                </button>
              )}
              {step < 5 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Submit JNF
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JNFForm;
