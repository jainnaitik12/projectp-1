import React, { useState } from "react";
import { Code, X, Plus } from "lucide-react";
import axiosinstance from "../../utils/axios";
const SkillsEdit = ({ initialSkills = [] }) => {
  const [skills, setSkills] = useState(initialSkills);
  const [newSkill, setNewSkill] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(null);

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setUpdateStatus(null);
    const studentId = localStorage.getItem("studentId");

    try {
      await axiosinstance.put(`/api/v1/student/profile/${studentId}`, {
        skills: skills,
      });
      setUpdateStatus('success');
    } catch (error) {
      console.log(error);
      setUpdateStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mb-2">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <Code className="mr-2" />
        Skills
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter a skill"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-100 px-3 py-1 rounded-full"
              >
                <span className="text-gray-700">{skill}</span>
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="ml-2 text-gray-500 hover:text-red-500"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              Updating...
            </div>
          ) : (
            "Update Changes"
          )}
        </button>

        {updateStatus === 'success' && (
          <p className="text-green-600 mt-2 text-center">Skills updated successfully!</p>
        )}
        {updateStatus === 'error' && (
          <p className="text-red-600 mt-2 text-center">Error updating skills. Please try again.</p>
        )}
      </form>
    </div>
  );
};

export default SkillsEdit;
