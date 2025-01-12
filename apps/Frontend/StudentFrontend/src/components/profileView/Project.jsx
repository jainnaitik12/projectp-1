import React from "react";
import { Globe , Briefcase } from "lucide-react";
function Project({student}) {
  return (
    <div>
      <div className="md:col-span-2 bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Projects</h2>
            <p className="text-gray-500">What I've built</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {student?.projects?.map((project, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-gradient-to-r from-indigo-50 to-indigo-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <h3 className="font-bold text-xl text-gray-800">
                  {project.title}
                </h3>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full hover:bg-indigo-200 transition-colors"
                  >
                    <Globe className="w-5 h-5 text-indigo-600" />
                  </a>
                )}
              </div>
              <p className="text-gray-600 mb-4 line-clamp-3 overflow-hidden text-ellipsis">
                {project.description}
              </p>
              {project.technologies && (
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-white text-indigo-600 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Project;
