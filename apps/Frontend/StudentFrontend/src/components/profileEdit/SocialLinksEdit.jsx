import React, { useState } from 'react';
import { Link as LinkIcon, PlusCircle, Trash2 } from 'lucide-react';

const SocialLinksEdit = ({ initialLinks = [] }) => {
  const [links, setLinks] = useState(initialLinks.length ? initialLinks : [
    { platform: '', url: '' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(null);

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleChange = (index, field, value) => {
    const newLinks = [...links];
    newLinks[index][field] = value;
    setLinks(newLinks);
  };

  const addLink = () => {
    setLinks([...links, { platform: '', url: '' }]);
  };

  const removeLink = (index) => {
    if (links.length > 1) {
      setLinks(links.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setUpdateStatus(null);

    try {
      await axiosinstance.put(`/api/v1/student/profile/${studentId}`, {
        socialLinks: links
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
        <LinkIcon className="mr-2" />
        Social Links
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {links.map((link, index) => (
          <div key={index} className="p-4 border rounded-lg space-y-4 bg-gray-50">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-700">
                Social Link #{index + 1}
              </h3>
              {links.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeLink(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Platform Name
                </label>
                <input
                  type="text"
                  value={link.platform}
                  onChange={(e) => handleChange(index, 'platform', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., LinkedIn, GitHub"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Profile URL
                </label>
                <input
                  type="url"
                  value={link.url}
                  onChange={(e) => handleChange(index, 'url', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://..."
                  required
                />
                {link.url && !validateUrl(link.url) && (
                  <p className="text-red-500 text-sm">Please enter a valid URL</p>
                )}
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addLink}
          className="flex items-center text-blue-600 hover:text-blue-700"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Add Another Link
        </button>

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
          <p className="text-green-600 mt-2 text-center">Social links updated successfully!</p>
        )}
        {updateStatus === 'error' && (
          <p className="text-red-600 mt-2 text-center">Error updating links. Please try again.</p>
        )}
      </form>
    </div>
  );
};

export default SocialLinksEdit;