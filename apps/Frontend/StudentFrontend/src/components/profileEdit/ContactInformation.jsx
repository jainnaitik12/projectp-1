import React, { useState } from 'react';
import { Mail, Phone } from 'lucide-react';

const ContactInformation = ({ email: initialEmail, phone: initialPhone }) => {
  const [email, setEmail] = useState(initialEmail || '');
  const [phone, setPhone] = useState(initialPhone || '');
  const [isLoading, setIsLoading] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(null);

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const validatePhone = (value) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(value);
  };

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setUpdateStatus(null);
    
    try {
      // Your existing axios call
      await axiosinstance.put(`/api/v1/student/profile/${studentId}`, {
        // your data
      });
      setUpdateStatus('success');
    } catch (error) {
      setUpdateStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <Mail className="mr-2" />
        Contact Information
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
                required
              />
              <Mail className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            {email && !validateEmail(email) && (
              <p className="text-red-500 text-sm">Please enter a valid email address</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <div className="relative">
              <input
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter 10-digit phone number"
                required
              />
              <Phone className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            {phone && !validatePhone(phone) && (
              <p className="text-red-500 text-sm">Please enter a valid 10-digit phone number</p>
            )}
          </div>
        </div>

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
          <p className="text-green-600 mt-2 text-center">Updated successfully!</p>
        )}
        {updateStatus === 'error' && (
          <p className="text-red-600 mt-2 text-center">Error updating. Please try again.</p>
        )}
      </form>
    </div>
  );
};

export default ContactInformation;