import React from "react";

const ProfileCard = ({ title, children, icon: Icon }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6 transition-all duration-300 hover:shadow-xl border border-gray-200">
      <div className="flex items-center mb-4">
        {Icon && (
          <div className="p-2 rounded-full bg-blue-50 mr-3">
            <Icon className="w-6 h-6 text-blue-600" />
          </div>
        )}
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      <div className="text-gray-600 space-y-3">{children}</div>
    </div>
  );
};

export default ProfileCard;
