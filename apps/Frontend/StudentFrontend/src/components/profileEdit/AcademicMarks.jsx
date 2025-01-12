import React, { useState, useEffect, useContext } from "react";
import { GraduationCap, School, Percent } from "lucide-react";
import axiosinstance from "../../utils/axios";
const AcademicMarks = ({ tenthmarks, twelfthmarks, cgpa }) => {
  const [tenth, setTenth] = useState(tenthmarks || "");
  const [twelfth, setTwelfth] = useState(twelfthmarks || "");
  const [currentCgpa, setCurrentCgpa] = useState(cgpa || "");
  const [isLoading, setIsLoading] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(null);

  const validateMarks = (value) => {
    const num = parseFloat(value);
    return num >= 0 && num <= 100 ? value : "";
  };

  const validateCGPA = (value) => {
    const num = parseFloat(value);
    return num >= 0 && num <= 10 ? value : "";
  };

  const handleTenthChange = (e) => {
    setTenth(validateMarks(e.target.value));
  };
  const handleTwelfthChange = (e) => {
    setTwelfth(validateMarks(e.target.value));
  };
  const handleCgpaChange = (e) => {
    setCurrentCgpa(validateCGPA(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const studentId = localStorage.getItem("studentId");

    try {
      await axiosinstance.put(`/api/v1/student/profile/${studentId}`, {
        academics: {
          cgpa: currentCgpa,
          tenthMarks: tenth,
          twelfthMarks: twelfth,
        },
      });
      setUpdateStatus("success");
    } catch (error) {
      setUpdateStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log(tenthmarks, twelfthmarks, cgpa);
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mb-2">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <GraduationCap className="mr-2" />
        Academic Information
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* School Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-lg font-semibold text-gray-700">
            <School />
            <h3>School Information</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                10th Percentage
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  value={tenth}
                  onChange={handleTenthChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter 10th percentage"
                />
                <Percent className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                12th Percentage
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  value={twelfth}
                  onChange={handleTwelfthChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter 12th percentage"
                />
                <Percent className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* College Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-lg font-semibold text-gray-700">
            <GraduationCap />
            <h3>College Information</h3>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Current CGPA
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.01"
                min="0"
                max="10"
                value={currentCgpa}
                onChange={handleCgpaChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter CGPA (out of 10)"
              />
              <Percent className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {isLoading ? (
            <div className="flex items-center">
              <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Updating...
            </div>
          ) : (
            "Update Changes"
          )}
        </button>

        {updateStatus === "success" && (
          <p className="text-green-600 mt-2">Updated successfully!</p>
        )}
        {updateStatus === "error" && (
          <p className="text-red-600 mt-2">
            Error updating details. Please try again.
          </p>
        )}
      </form>
    </div>
  );
};

export default AcademicMarks;
