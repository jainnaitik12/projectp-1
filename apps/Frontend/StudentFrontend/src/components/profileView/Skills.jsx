import React from 'react'
import { Code } from 'lucide-react'
function Skills({student}) {
  return (
    <div>
         <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-purple-600">
              <Code className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Skills</h2>
              <p className="text-gray-500">Technical expertise</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {student?.skills?.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gradient-to-r from-purple-50 to-purple-100 text-purple-600 rounded-full text-sm font-medium hover:shadow-md transition-all duration-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
    </div>
  )
}

export default Skills
