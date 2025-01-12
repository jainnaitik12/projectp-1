import React, { useState } from 'react';
import { School, PlusCircle, Trash2, GraduationCap, Calendar } from 'lucide-react';
import axiosinstance from '../../utils/axios';

const EducationEdit = ({ initialEducation = [] }) => {
  const [educationList, setEducationList] = useState(initialEducation.length ? initialEducation : [{
    institution: '',
    degree: '',
    year: ''
  }]);

  const [isLoading, setIsLoading] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(null);

  const handleChange = (index, field, value) => {
    const newList = [...educationList];
    newList[index][field] = value;
    setEducationList(newList);
  };

  const addEducation = () => {
    setEducationList([...educationList, { institution: '', degree: '', year: '' }]);
  };

  const removeEducation = (index) => {
    if (educationList.length > 1) {
      const newList = educationList.filter((_, i) => i !== index);
      setEducationList(newList);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setUpdateStatus(null);
    const studentId = localStorage.getItem("studentId");
    try {
        await axiosinstance.put(`/api/v1/student/profile/${studentId}`, {
            education: educationList
        });
        setUpdateStatus('success');
    } catch (error) {
        setUpdateStatus('error');
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mb-2">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <GraduationCap className="mr-2" />
        Education Details
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {educationList.map((edu, index) => (
          <div key={index} className="p-4 border rounded-lg space-y-4 bg-gray-50">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-700">
                Education #{index + 1}
              </h3>
              {educationList.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Institution Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => handleChange(index, 'institution', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  <School className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Degree/Course
                </label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => handleChange(index, 'degree', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Year of Completion
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1900"
                    max="2099"
                    value={edu.year}
                    onChange={(e) => handleChange(index, 'year', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addEducation}
          className="flex items-center text-blue-600 hover:text-blue-700"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Add Another Education
        </button>

        <>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 disabled:bg-blue-400"
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
            <p className="text-green-600 mt-2 text-center">Education details updated successfully!</p>
          )}
          {updateStatus === 'error' && (
            <p className="text-red-600 mt-2 text-center">Error updating details. Please try again.</p>
          )}
        </>
      </form>
    </div>
  );
};

export default EducationEdit;