import { useCallback } from 'react';
import { auditService } from '../../services/admin/auditService';

export const useAudit = () => {
  const logEvent = useCallback(async (action, resource, details) => {
    try {
      await auditService.logEvent({
        action,
        resource,
        details
      });
    } catch (error) {
      console.error('Error logging audit event:', error);
    }
  }, []);

  return { logEvent };
}; 