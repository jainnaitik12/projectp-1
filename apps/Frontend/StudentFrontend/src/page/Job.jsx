import { useState } from 'react';
import { Search, Filter, Building2, MapPin, Briefcase, Calendar, Users, ChartBar, ClipboardCheck } from 'lucide-react';
  // Sample jobs data matching schema
import jobs from '../repodummydata/jobs';







const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [filter, setFilter] = useState('all');



  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' ? true : job.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search jobs..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      <div className="grid gap-4">
        {filteredJobs.map(job => (
          <div 
            key={job.id}
            className="p-6 border rounded-lg hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => {
              setSelectedJob(job);
              setShowModal(true);
            }}
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                  <span className={`px-2 py-1 rounded text-sm ${
                    job.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {job.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-2 text-gray-600">
                  <span className="flex items-center gap-1">
                    <Building2 size={16} />
                    {job.company}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={16} />
                    {job.numberOfPositions} positions
                  </span>
                  <span className="flex items-center gap-1">
                    <ChartBar size={16} />
                    Min CGPA: {job.eligibility.minCGPA}
                  </span>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">₹{(job.salary.ctc/100000).toFixed(1)}L CTC</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">{selectedJob.title}</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-gray-600">
                <span className="flex items-center gap-1">
                  <Building2 size={16} />
                  {selectedJob.company}
                </span>
                <span className={`px-2 py-1 rounded text-sm ${
                  selectedJob.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {selectedJob.status}
                </span>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">Requirements</h3>
                <ul className="list-disc list-inside">
                  {selectedJob.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">Eligibility</h3>
                <p>Departments: {selectedJob.eligibility.departments.join(', ')}</p>
                <p>Minimum CGPA: {selectedJob.eligibility.minCGPA}</p>
                <p>Batch: {selectedJob.eligibility.batch}</p>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">Selection Process</h3>
                {selectedJob.rounds.map((round, index) => (
                  <div key={index} className="mb-2">
                    <p className="font-medium">{round.name}</p>
                    <p className="text-sm text-gray-600">{round.description}</p>
                    <p className="text-sm text-gray-600">
                      Date: {new Date(round.date).toLocaleDateString()} | Venue: {round.venue}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">Analytics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{selectedJob.analytics.views}</p>
                    <p className="text-sm text-gray-600">Views</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{selectedJob.analytics.applications}</p>
                    <p className="text-sm text-gray-600">Applications</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{selectedJob.analytics.shortlisted}</p>
                    <p className="text-sm text-gray-600">Shortlisted</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{selectedJob.analytics.selected}</p>
                    <p className="text-sm text-gray-600">Selected</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-4">
                <button 
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;