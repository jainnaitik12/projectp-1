import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNotification } from './useNotification';
import templateService from '../../services/admin/templateService';

export const useTemplate = () => {
  const dispatch = useDispatch();
  const { showSuccess, showError } = useNotification();
  const [loading, setLoading] = useState(false);

  const getTemplates = async (params) => {
    try {
      setLoading(true);
      // For development, return mock data
      return {
        data: [
          {
            id: 1,
            name: 'Offer Letter Template',
            type: 'Letter',
            createdAt: '2024-01-15',
            lastModified: '2024-01-20',
            status: 'Active',
          },
          {
            id: 2,
            name: 'Interview Schedule',
            type: 'Email',
            createdAt: '2024-01-10',
            lastModified: '2024-01-18',
            status: 'Active',
          },
          {
            id: 3,
            name: 'Placement Report',
            type: 'Document',
            createdAt: '2024-01-05',
            lastModified: '2024-01-15',
            status: 'Draft',
          },
        ],
        total: 3,
      };
    } catch (error) {
      showError('Failed to fetch templates');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createTemplate = async (data) => {
    try {
      setLoading(true);
      const response = await templateService.create(data);
      showSuccess('Template created successfully');
      return response;
    } catch (error) {
      showError('Failed to create template');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateTemplate = async (id, data) => {
    try {
      setLoading(true);
      const response = await templateService.update(id, data);
      showSuccess('Template updated successfully');
      return response;
    } catch (error) {
      showError('Failed to update template');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteTemplate = async (id) => {
    try {
      setLoading(true);
      await templateService.delete(id);
      showSuccess('Template deleted successfully');
    } catch (error) {
      showError('Failed to delete template');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    getTemplates,
    createTemplate,
    updateTemplate,
    deleteTemplate,
  };
}; 