import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNotification } from './useNotification';
import placementService from '../../services/admin/placementService';

export const usePlacement = () => {
  const dispatch = useDispatch();
  const { showSuccess, showError } = useNotification();
  const [loading, setLoading] = useState(false);

  const getPlacements = async (params) => {
    try {
      setLoading(true);
      // For development, return mock data
      return {
        data: [
          {
            id: 1,
            companyName: 'Tech Corp',
            role: 'Software Engineer',
            package: '12.5',
            openings: 10,
            appliedCount: 50,
            selectedCount: 5,
            status: 'In Progress',
            startDate: '2024-02-15',
          },
          {
            id: 2,
            companyName: 'Data Systems',
            role: 'Data Analyst',
            package: '8.5',
            openings: 5,
            appliedCount: 30,
            selectedCount: 3,
            status: 'Completed',
            startDate: '2024-02-10',
          },
        ],
        total: 2,
      };
    } catch (error) {
      showError('Failed to fetch placements');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createPlacement = async (data) => {
    try {
      setLoading(true);
      const response = await placementService.create(data);
      showSuccess('Placement drive created successfully');
      return response;
    } catch (error) {
      showError('Failed to create placement drive');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updatePlacement = async (id, data) => {
    try {
      setLoading(true);
      const response = await placementService.update(id, data);
      showSuccess('Placement drive updated successfully');
      return response;
    } catch (error) {
      showError('Failed to update placement drive');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deletePlacement = async (id) => {
    try {
      setLoading(true);
      await placementService.delete(id);
      showSuccess('Placement drive deleted successfully');
    } catch (error) {
      showError('Failed to delete placement drive');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    getPlacements,
    createPlacement,
    updatePlacement,
    deletePlacement,
  };
}; 