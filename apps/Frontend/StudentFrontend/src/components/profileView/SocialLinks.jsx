import React from "react";
import { Globe, Linkedin, Code } from "lucide-react";
function SocialLinks() {
  const links = {
    linkedin: "https://linkedin.com/in/johndoe",
    codeforces: "https://codeforces.com/profile/johndoe",
    codechef: "https://www.codechef.com/users/johndoe",
    leetcode: "https://leetcode.com/johndoe",
  };
  return (
    <div>
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-full bg-gradient-to-r from-pink-500 to-pink-600">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Social Links</h2>
            <p className="text-gray-500">Connect with me</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          {links.linkedin && (
            <a
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300"
            >
              <Linkedin className="w-5 h-5" /> LinkedIn
            </a>
          )}
          {links.leetcode && (
            <a
              href={links.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300"
            >
              <Code className="w-5 h-5" /> LeetCode
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default SocialLinks;
