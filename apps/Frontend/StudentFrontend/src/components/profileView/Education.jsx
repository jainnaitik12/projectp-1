import React from "react";
import { GraduationCap, Building, Calendar } from "lucide-react";
function Education({education}) {
  return (
    <div>
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-full bg-gradient-to-r from-green-500 to-green-600">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Education</h2>
            <p className="text-gray-500">Academic background</p>
          </div>
        </div>
        {education.map((edu, index) => (
          <div
            key={index}
            className="mb-4 p-4 rounded-xl bg-gradient-to-r from-green-50 to-green-100"
          >
            <div className="flex items-center gap-3 mb-2">
              <Building className="w-5 h-5 text-green-600" />
              <p className="font-bold text-gray-800">{edu.institution}</p>
            </div>
            <div className="ml-8 space-y-2">
              <p className="text-gray-600">{edu.degree}</p>
              <div className="flex items-center gap-2 text-green-600">
                <Calendar className="w-4 h-4" />
                <p className="text-sm">{edu.year}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Education;
