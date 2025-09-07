import { useState, useEffect, useCallback } from 'react';
import { PresentationService } from '../services/presentationService';
import type { 
  Presentation, 
  PresentationFilterParams, 
  PresentationRegistration,
  ApiResponse 
} from '../types';

/**
 * Hook for managing presentations
 */
export const usePresentations = (initialParams?: PresentationFilterParams) => {
  const [presentations, setPresentations] = useState<Presentation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    count: 0,
    next: null as string | null,
    previous: null as string | null,
  });

  const fetchPresentations = useCallback(async (params?: PresentationFilterParams) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await PresentationService.getPresentations(params);
      if (response.success && response.data) {
        setPresentations(response.data.results);
        setPagination({
          count: response.data.count,
          next: response.data.next,
          previous: response.data.previous,
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch presentations');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPresentations(initialParams);
  }, [fetchPresentations, initialParams]);

  const refresh = useCallback(() => {
    fetchPresentations(initialParams);
  }, [fetchPresentations, initialParams]);

  return {
    presentations,
    loading,
    error,
    pagination,
    fetchPresentations,
    refresh,
  };
};

/**
 * Hook for managing a single presentation
 */
export const usePresentation = (id: number) => {
  const [presentation, setPresentation] = useState<Presentation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPresentation = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await PresentationService.getPresentation(id);
      if (response.success && response.data) {
        setPresentation(response.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch presentation');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchPresentation();
    }
  }, [fetchPresentation, id]);

  const refresh = useCallback(() => {
    fetchPresentation();
  }, [fetchPresentation]);

  return {
    presentation,
    loading,
    error,
    refresh,
  };
};

/**
 * Hook for managing presentation registrations
 */
export const usePresentationRegistrations = () => {
  const [registrations, setRegistrations] = useState<PresentationRegistration[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRegistrations = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await PresentationService.getMyRegistrations();
      if (response.success && response.data) {
        setRegistrations(response.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch registrations');
    } finally {
      setLoading(false);
    }
  }, []);

  const registerForPresentation = useCallback(async (presentationId: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await PresentationService.registerForPresentation({ presentation_id: presentationId });
      if (response.success) {
        // Refresh registrations after successful registration
        await fetchRegistrations();
        return response.data;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to register for presentation');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchRegistrations]);

  const unregisterFromPresentation = useCallback(async (presentationId: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await PresentationService.unregisterFromPresentation(presentationId);
      if (response.success) {
        // Refresh registrations after successful unregistration
        await fetchRegistrations();
        return response.data;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to unregister from presentation');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchRegistrations]);

  const submitFeedback = useCallback(async (registrationId: number, rating: number, comment?: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await PresentationService.submitFeedback({
        registration_id: registrationId,
        rating,
        comment,
      });
      if (response.success) {
        // Refresh registrations to get updated feedback
        await fetchRegistrations();
        return response.data;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit feedback');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchRegistrations]);

  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  const refresh = useCallback(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  return {
    registrations,
    loading,
    error,
    registerForPresentation,
    unregisterFromPresentation,
    submitFeedback,
    refresh,
  };
};

/**
 * Hook for managing featured presentations
 */
export const useFeaturedPresentations = () => {
  const [presentations, setPresentations] = useState<Presentation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFeaturedPresentations = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await PresentationService.getFeaturedPresentations();
      if (response.success && response.data) {
        setPresentations(response.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch featured presentations');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeaturedPresentations();
  }, [fetchFeaturedPresentations]);

  const refresh = useCallback(() => {
    fetchFeaturedPresentations();
  }, [fetchFeaturedPresentations]);

  return {
    presentations,
    loading,
    error,
    refresh,
  };
};

/**
 * Hook for managing upcoming presentations
 */
export const useUpcomingPresentations = (limit?: number) => {
  const [presentations, setPresentations] = useState<Presentation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUpcomingPresentations = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await PresentationService.getUpcomingPresentations(limit);
      if (response.success && response.data) {
        setPresentations(response.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch upcoming presentations');
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchUpcomingPresentations();
  }, [fetchUpcomingPresentations]);

  const refresh = useCallback(() => {
    fetchUpcomingPresentations();
  }, [fetchUpcomingPresentations]);

  return {
    presentations,
    loading,
    error,
    refresh,
  };
};
