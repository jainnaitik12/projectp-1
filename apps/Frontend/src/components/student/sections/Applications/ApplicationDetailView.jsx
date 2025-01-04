import React from "react";
import { motion } from "framer-motion";
import { Close } from "@mui/icons-material";

const ApplicationDetailView = ({ application, onClose }) => {
  if (!application) return null;

  const jobDetails = {
    title: application.job?.title || "N/A",
    company: application.job?.company || "N/A",
    description: application.job?.description || "No description available",
    requirements: application.job?.requirements || "No requirements specified",
    salary: application.job?.salary || "Not specified",
  };

  const getStatusClass = (status) => {
    const statusClasses = {
      pending: "bg-amber-100 text-amber-800 border border-amber-200",
      accepted: "bg-emerald-100 text-emerald-800 border border-emerald-200",
      rejected: "bg-rose-100 text-rose-800 border border-rose-200",
    };
    return statusClasses[status] || statusClasses.pending;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl"
      >
        {/* Header Section */}
        <div
          style={{
            background: "linear-gradient(135deg, #2c3e50 0%, #3498db 100%)",
            padding: "16px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div className="flex justify-between items-start">
            <div className="text-white">
              <h2 className="text-2xl font-bold">{jobDetails.title}</h2>
              <p className="text-blue-100 mt-1">
                Applied on:{" "}
                {new Date(application.appliedAt).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors p-1"
            >
              <Close className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-5rem)]">
          <div className="space-y-6">
            {/* Company & Status Section */}
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {jobDetails.company}
                </h3>
              </div>
              <span
                className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusClass(
                  application.status
                )}`}
              >
                {application.status?.charAt(0).toUpperCase() +
                  application.status?.slice(1)}
              </span>
            </div>

            {/* Job Details Sections */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="text-lg font-semibold text-blue-800 mb-2">
                  Salary Package
                </h4>
                <p className="text-blue-900">
                  {typeof jobDetails.salary === "object"
                    ? `₹${jobDetails.salary.ctc || "N/A"} LPA`
                    : `₹${jobDetails.salary} LPA`}
                </p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="text-lg font-semibold text-purple-800 mb-2">
                  Application Status
                </h4>
                <div className="flex gap-2 items-center">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      application.status === "accepted"
                        ? "bg-green-500"
                        : application.status === "rejected"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  ></div>
                  <p className="text-purple-900">
                    {application.status?.charAt(0).toUpperCase() +
                      application.status?.slice(1)}
                  </p>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                Job Description
              </h4>
              <p className="text-gray-600 whitespace-pre-line">
                {jobDetails.description}
              </p>
            </div>

            {/* Requirements Section */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                Requirements
              </h4>
              <p className="text-gray-600 whitespace-pre-line ">
                {jobDetails.requirements}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="border-t px-6 py-4 bg-gray-50">
          <button
            onClick={onClose}
            className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg 
                     hover:bg-gray-200 transition-colors duration-200 font-medium"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ApplicationDetailView;
