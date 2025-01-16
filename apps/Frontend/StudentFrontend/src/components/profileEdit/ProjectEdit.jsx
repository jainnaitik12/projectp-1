import React, { useState } from 'react';
import { BookOpen, Link as LinkIcon, Code, FileText, PlusCircle, Trash2 } from 'lucide-react';
import axiosinstance from '../../utils/axios';
const ProjectEdit = ({ initialProjects = [] }) => {
  const [isLoading, setIsLoading] = useState(false);
    const [updateStatus, setUpdateStatus] = useState(null);
  
  const [projects, setProjects] = useState(initialProjects.length ? initialProjects : [{
    title: '',
    description: '',
    technologies: '',
    link: ''
  }]);

  const handleChange = (index, field, value) => {
    const newProjects = [...projects];
    newProjects[index][field] = value;
    setProjects(newProjects);
  };

  const addProject = () => {
    setProjects([...projects, { title: '', description: '', technologies: '', link: '' }]);
  };

  const removeProject = (index) => {
    if (projects.length > 1) {
      const newProjects = projects.filter((_, i) => i !== index);
      setProjects(newProjects);
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsLoading(true);
    setUpdateStatus(null);
    const studentId = localStorage.getItem("studentId");

    try {
      await axiosinstance.put(`/api/v1/student/profile/${studentId}`, {
        projects: projects,
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
        Projects
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {projects.map((project, index) => (
          <div key={index} className="p-4 border rounded-lg space-y-4 bg-gray-50">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-700">
                Project #{index + 1}
              </h3>
              {projects.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeProject(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Project Title
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={project.title}
                    onChange={(e) => handleChange(index, 'title', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  <BookOpen className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <div className="relative">
                  <textarea
                    value={project.description}
                    onChange={(e) => handleChange(index, 'description', e.target.value)}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  <FileText className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Technologies Used
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={project.technologies}
                    onChange={(e) => handleChange(index, 'technologies', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., React, Node.js, MongoDB"
                    required
                  />
                  <Code className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Project Link
                </label>
                <div className="relative">
                  <input
                    type="url"
                    value={project.link}
                    onChange={(e) => handleChange(index, 'link', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://..."
                  />
                  <LinkIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addProject}
          className="flex items-center text-blue-600 hover:text-blue-700"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Add Another Project
        </button>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Save Projects
        </button>
      </form>
    </div>
  );
};

export default ProjectEdit;