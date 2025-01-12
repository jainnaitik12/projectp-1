import axios from '../../config/axios';
import { API_BASE_URL } from '../../config/constants';

// Mock data for testing until backend integration
const mockPlacementData = {
  overview: {
    totalStudents: 500,
    placedStudents: 450,
    averagePackage: "12.5 LPA",
    highestPackage: "45 LPA",
    placementPercentage: "90%"
  },
  branchWise: [
    { branch: "Computer Science", placed: 150, total: 160, percentage: "93.75%" },
    { branch: "Information Technology", placed: 140, total: 150, percentage: "93.33%" },
    { branch: "Electronics", placed: 120, total: 140, percentage: "85.71%" },
    { branch: "Mechanical", placed: 40, total: 50, percentage: "80%" }
  ],
  monthWise: [
    { month: "July 2023", placements: 50 },
    { month: "August 2023", placements: 100 },
    { month: "September 2023", placements: 150 },
    { month: "October 2023", placements: 100 },
    { month: "November 2023", placements: 50 }
  ],
  packageRanges: [
    { range: "3-5 LPA", count: 100 },
    { range: "5-10 LPA", count: 200 },
    { range: "10-15 LPA", count: 100 },
    { range: "15+ LPA", count: 50 }
  ]
};

const mockCompanyData = {
  companies: [
    { 
      name: "Google",
      visits: 2,
      positions: ["SDE", "Product Manager"],
      studentsHired: 15,
      averagePackage: "25 LPA"
    },
    // Add more company data
  ],
  industryWise: [
    { industry: "Technology", count: 25 },
    { industry: "Finance", count: 15 },
    { industry: "Consulting", count: 10 }
  ]
};

const mockStudentData = {
  departmentWise: [
    { department: "CSE", total: 160, placed: 150 },
    { department: "IT", total: 150, placed: 140 }
  ],
  categoryWise: [
    { category: "General", total: 200, placed: 180 },
    { category: "OBC", total: 150, placed: 140 }
  ]
};

// Mock templates data
const mockTemplates = [
  {
    id: 1,
    name: 'Monthly Placement Summary',
    type: 'placement',
    metrics: ['Total Students', 'Placed Students'],
    filters: { period: 'monthly' }
  },
  {
    id: 2,
    name: 'Company Visits Report',
    type: 'company',
    metrics: ['Total Visits', 'Students Hired'],
    filters: { period: 'yearly' }
  }
];

// Local storage key for templates
const TEMPLATES_STORAGE_KEY = 'report_templates';

const reportService = {
  // Get all reports with filters
  getReports: async (filters, pagination) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/reports`, {
        params: {
          ...filters,
          page: pagination.page,
          limit: pagination.rowsPerPage,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching reports:', error);
      // Return mock data for now
      return {
        placement: mockPlacementData,
        company: mockCompanyData,
        student: mockStudentData
      };
    }
  },

  // Generate a new report
  generateReport: async (reportConfig) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/reports/generate`, reportConfig);
      return response.data;
    } catch (error) {
      console.error('Error generating report:', error);
      // Mock response
      return {
        id: Date.now(),
        status: 'generated',
        ...reportConfig
      };
    }
  },

  // Schedule a report
  scheduleReport: async (scheduleConfig) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/reports/schedule`, scheduleConfig);
      return response.data;
    } catch (error) {
      console.error('Error scheduling report:', error);
      return {
        id: Date.now(),
        status: 'scheduled',
        ...scheduleConfig
      };
    }
  },

  // Download a report
  downloadReport: async (id, format = 'pdf') => {
    try {
      const response = await axios.get(`${API_BASE_URL}/reports/${id}/download`, {
        params: { format },
        responseType: 'blob',
      });
      
      // Create a download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `report_${id}.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      return response.data;
    } catch (error) {
      console.error('Error downloading report:', error);
      // Mock download for testing
      console.log(`Downloading report ${id} in ${format} format`);
    }
  },

  // Delete a report
  deleteReport: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/reports/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting report:', error);
      return { success: true, message: 'Report deleted successfully' };
    }
  },

  // Get available report types
  getReportTypes: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/reports/types`);
      return response.data;
    } catch (error) {
      console.error('Error fetching report types:', error);
      return [
        { id: 'placement', name: 'Placement Report' },
        { id: 'company', name: 'Company Report' },
        { id: 'student', name: 'Student Report' },
        { id: 'custom', name: 'Custom Report' }
      ];
    }
  },

  // Preview a report
  previewReport: async (reportConfig) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/reports/preview`, reportConfig);
      return response.data;
    } catch (error) {
      console.error('Error previewing report:', error);
      // Return mock data based on report type
      switch (reportConfig.type) {
        case 'placement':
          return mockPlacementData;
        case 'company':
          return mockCompanyData;
        case 'student':
          return mockStudentData;
        default:
          return {};
      }
    }
  },

  // Get scheduled reports
  getScheduledReports: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/reports/scheduled`);
      return response.data;
    } catch (error) {
      console.error('Error fetching scheduled reports:', error);
      return [
        {
          id: 1,
          name: 'Monthly Placement Report',
          schedule: 'monthly',
          nextRun: '2024-04-01',
          type: 'placement'
        }
      ];
    }
  },

  // Cancel a scheduled report
  cancelScheduledReport: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/reports/scheduled/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error canceling scheduled report:', error);
      return { success: true, message: 'Scheduled report canceled successfully' };
    }
  },

  // Get filtered reports based on type
  getFilteredReports: async (type, filters) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log('Applying filters:', filters);
      
      // Return appropriate mock data based on type
      switch (type) {
        case 'placement':
          return mockPlacementData;
        case 'company':
          return mockCompanyData;
        case 'student':
          return mockStudentData;
        default:
          return {};
      }
    } catch (error) {
      console.error(`Error fetching ${type} reports:`, error);
      throw error;
    }
  },

  // Save custom report template
  saveReportTemplate: async (template) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Get existing templates from local storage
      const existingTemplates = JSON.parse(localStorage.getItem(TEMPLATES_STORAGE_KEY) || '[]');
      
      // Create new template with ID
      const newTemplate = {
        ...template,
        id: Date.now(),
        createdAt: new Date().toISOString()
      };
      
      // Save to local storage
      const updatedTemplates = [...existingTemplates, newTemplate];
      localStorage.setItem(TEMPLATES_STORAGE_KEY, JSON.stringify(updatedTemplates));
      
      return newTemplate;
    } catch (error) {
      console.error('Error saving template:', error);
      throw error;
    }
  },

  // Get saved report templates
  getReportTemplates: async () => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Get templates from local storage or use mock data
      const storedTemplates = localStorage.getItem(TEMPLATES_STORAGE_KEY);
      return storedTemplates ? JSON.parse(storedTemplates) : mockTemplates;
    } catch (error) {
      console.error('Error fetching templates:', error);
      return mockTemplates;
    }
  },

  // Delete report template
  deleteReportTemplate: async (templateId) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Get existing templates
      const existingTemplates = JSON.parse(localStorage.getItem(TEMPLATES_STORAGE_KEY) || '[]');
      
      // Filter out the deleted template
      const updatedTemplates = existingTemplates.filter(t => t.id !== templateId);
      
      // Save back to local storage
      localStorage.setItem(TEMPLATES_STORAGE_KEY, JSON.stringify(updatedTemplates));
      
      return true;
    } catch (error) {
      console.error('Error deleting template:', error);
      throw error;
    }
  }
};

export default reportService; 