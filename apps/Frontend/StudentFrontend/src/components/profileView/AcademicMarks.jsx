import React from "react";
import { GraduationCap, CheckCircle2 } from "lucide-react";
function AcademicMarks({ student }) {
  return (
    <div>
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div className="flex items-center justify-between flex-1">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Academic Performance
              </h2>
              <p className="text-gray-500">Educational marks</p>
            </div>
            {student?.verificationStatus === "verified" && (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm">
                  Verified on {new Date(verificationDate).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-gradient-to-r from-orange-50 to-orange-100">
            <p className="text-sm text-gray-600 mb-1">CGPA</p>
            <p className="text-2xl font-bold text-gray-800">{student?.academics.cgpa}</p>
          </div>
          <div className="p-4 rounded-lg bg-gradient-to-r from-orange-50 to-orange-100">
            <p className="text-sm text-gray-600 mb-1">10th Grade</p>
            <p className="text-2xl font-bold text-gray-800">
              {student?.academics.tenthMarks}%
            </p>
          </div>
          <div className="p-4 rounded-lg bg-gradient-to-r from-orange-50 to-orange-100">
            <p className="text-sm text-gray-600 mb-1">12th Grade</p>
            <p className="text-2xl font-bold text-gray-800">
              {student?.academics?.twelfthMarks}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AcademicMarks;
