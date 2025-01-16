import React from "react";
import { Mail, Phone } from "lucide-react";
function ContactInformation({email , phone}) {
  return (
    <div>
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Contact Info</h2>
            <p className="text-gray-500">How to reach me</p>
          </div>
        </div>
        <div className="space-y-4">
          <p className="flex items-center gap-3 text-gray-600">
            <Mail className="w-5 h-5 text-blue-500" />
            {email}
          </p>
          <p className="flex items-center gap-3 text-gray-600">
            <Phone className="w-5 h-5 text-blue-500" />
            {phone}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ContactInformation;
