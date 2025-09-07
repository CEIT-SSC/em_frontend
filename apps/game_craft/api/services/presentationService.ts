import { httpClient } from '../httpClient';
import { API_CONFIG } from '../config';
import type { 
  ApiResponse, 
  Presentation,
  PresentationCreateRequest,
  PresentationUpdateRequest,
  PresentationRegistration,
  PresentationRegistrationRequest,
  PresentationFeedbackRequest,
  PresentationFilterParams
} from '../types';

/**
 * Presentation API service
 */
export class PresentationService {
  /**
   * Get all presentations with optional filtering
   */
  static async getPresentations(params?: PresentationFilterParams): Promise<ApiResponse<{
    count: number;
    next: string | null;
    previous: string | null;
    results: Presentation[];
  }>> {
    try {
      const queryParams = new URLSearchParams();
      
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            if (Array.isArray(value)) {
              // Handle array parameters (like tags)
              value.forEach(item => queryParams.append(key, item.toString()));
            } else {
              queryParams.append(key, value.toString());
            }
          }
        });
      }

      const queryString = queryParams.toString();
      const url = queryString 
        ? `${API_CONFIG.endpoints.presentations}?${queryString}`
        : API_CONFIG.endpoints.presentations;

      const response = await httpClient.get<{
        count: number;
        next: string | null;
        previous: string | null;
        results: Presentation[];
      }>(url);

      return response;
    } catch (error) {
      throw new Error(`Failed to fetch presentations: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get a specific presentation by ID
   */
  static async getPresentation(id: number): Promise<ApiResponse<Presentation>> {
    try {
      const response = await httpClient.get<Presentation>(`${API_CONFIG.endpoints.presentations}${id}/`);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch presentation: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Create a new presentation (admin/staff only)
   */
  static async createPresentation(data: PresentationCreateRequest): Promise<ApiResponse<Presentation>> {
    try {
      // Check if any presenter has a file image, use form data
      const hasFileImages = data.presenters_details.some(
        presenter => presenter.presenter_picture instanceof File
      );

      if (hasFileImages) {
        const formData = new FormData();
        
        // Handle presenters_details separately
        data.presenters_details.forEach((presenter, index) => {
          formData.append(`presenters_details[${index}][name]`, presenter.name);
          formData.append(`presenters_details[${index}][email]`, presenter.email);
          formData.append(`presenters_details[${index}][bio]`, presenter.bio);
          
          if (presenter.presenter_picture instanceof File) {
            formData.append(`presenters_details[${index}][presenter_picture]`, presenter.presenter_picture);
          } else if (typeof presenter.presenter_picture === 'string') {
            formData.append(`presenters_details[${index}][presenter_picture]`, presenter.presenter_picture);
          }
        });

        // Handle other fields
        Object.entries(data).forEach(([key, value]) => {
          if (key !== 'presenters_details' && value !== undefined && value !== null) {
            if (Array.isArray(value)) {
              value.forEach(item => formData.append(key, item.toString()));
            } else {
              formData.append(key, value.toString());
            }
          }
        });

        const response = await httpClient.post<Presentation>(
          API_CONFIG.endpoints.presentations,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        return response;
      } else {
        // Regular JSON request
        const response = await httpClient.post<Presentation>(
          API_CONFIG.endpoints.presentations,
          data
        );
        return response;
      }
    } catch (error) {
      throw new Error(`Failed to create presentation: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Update a presentation (admin/staff only)
   */
  static async updatePresentation(id: number, data: PresentationUpdateRequest): Promise<ApiResponse<Presentation>> {
    try {
      // Check if any presenter has a file image, use form data
      const hasFileImages = data.presenters_details?.some(
        presenter => presenter.presenter_picture instanceof File
      );

      if (hasFileImages) {
        const formData = new FormData();
        
        // Handle presenters_details if provided
        if (data.presenters_details) {
          data.presenters_details.forEach((presenter, index) => {
            formData.append(`presenters_details[${index}][name]`, presenter.name);
            formData.append(`presenters_details[${index}][email]`, presenter.email);
            formData.append(`presenters_details[${index}][bio]`, presenter.bio);
            
            if (presenter.presenter_picture instanceof File) {
              formData.append(`presenters_details[${index}][presenter_picture]`, presenter.presenter_picture);
            } else if (typeof presenter.presenter_picture === 'string') {
              formData.append(`presenters_details[${index}][presenter_picture]`, presenter.presenter_picture);
            }
          });
        }

        // Handle other fields
        Object.entries(data).forEach(([key, value]) => {
          if (key !== 'presenters_details' && value !== undefined && value !== null) {
            if (Array.isArray(value)) {
              value.forEach(item => formData.append(key, item.toString()));
            } else {
              formData.append(key, value.toString());
            }
          }
        });

        const response = await httpClient.patch<Presentation>(
          `${API_CONFIG.endpoints.presentations}${id}/`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        return response;
      } else {
        // Regular JSON request
        const response = await httpClient.patch<Presentation>(
          `${API_CONFIG.endpoints.presentations}${id}/`,
          data
        );
        return response;
      }
    } catch (error) {
      throw new Error(`Failed to update presentation: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Delete a presentation (admin/staff only)
   */
  static async deletePresentation(id: number): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await httpClient.delete<{ message: string }>(`${API_CONFIG.endpoints.presentations}${id}/`);
      return response;
    } catch (error) {
      throw new Error(`Failed to delete presentation: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Register for a presentation
   */
  static async registerForPresentation(data: PresentationRegistrationRequest): Promise<ApiResponse<PresentationRegistration>> {
    try {
      const response = await httpClient.post<PresentationRegistration>(
        `${API_CONFIG.endpoints.presentations}${data.presentation_id}/register/`,
        {}
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to register for presentation: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Unregister from a presentation
   */
  static async unregisterFromPresentation(presentationId: number): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await httpClient.delete<{ message: string }>(`${API_CONFIG.endpoints.presentations}${presentationId}/unregister/`);
      return response;
    } catch (error) {
      throw new Error(`Failed to unregister from presentation: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get user's presentation registrations
   */
  static async getMyRegistrations(): Promise<ApiResponse<PresentationRegistration[]>> {
    try {
      const response = await httpClient.get<PresentationRegistration[]>(`${API_CONFIG.endpoints.presentations}registrations/`);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch registrations: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get registrations for a specific presentation (admin/staff only)
   */
  static async getPresentationRegistrations(presentationId: number): Promise<ApiResponse<PresentationRegistration[]>> {
    try {
      const response = await httpClient.get<PresentationRegistration[]>(`${API_CONFIG.endpoints.presentations}${presentationId}/registrations/`);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch presentation registrations: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Submit feedback for a presentation
   */
  static async submitFeedback(data: PresentationFeedbackRequest): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await httpClient.post<{ message: string }>(`${API_CONFIG.endpoints.presentations}feedback/`, data);
      return response;
    } catch (error) {
      throw new Error(`Failed to submit feedback: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get featured presentations
   */
  static async getFeaturedPresentations(): Promise<ApiResponse<Presentation[]>> {
    try {
      const response = await httpClient.get<Presentation[]>(`${API_CONFIG.endpoints.presentations}featured/`);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch featured presentations: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get upcoming presentations
   */
  static async getUpcomingPresentations(limit?: number): Promise<ApiResponse<Presentation[]>> {
    try {
      const queryParams = new URLSearchParams();
      if (limit) {
        queryParams.append('limit', limit.toString());
      }
      
      const queryString = queryParams.toString();
      const url = queryString 
        ? `${API_CONFIG.endpoints.presentations}upcoming/?${queryString}`
        : `${API_CONFIG.endpoints.presentations}upcoming/`;

      const response = await httpClient.get<Presentation[]>(url);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch upcoming presentations: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get presentations by category
   */
  static async getPresentationsByCategory(category: string): Promise<ApiResponse<Presentation[]>> {
    try {
      const response = await httpClient.get<Presentation[]>(`${API_CONFIG.endpoints.presentations}category/${category}/`);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch presentations by category: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Search presentations
   */
  static async searchPresentations(query: string, filters?: Partial<PresentationFilterParams>): Promise<ApiResponse<{
    count: number;
    next: string | null;
    previous: string | null;
    results: Presentation[];
  }>> {
    try {
      const searchParams: PresentationFilterParams = {
        search: query,
        ...filters
      };
      
      return this.getPresentations(searchParams);
    } catch (error) {
      throw new Error(`Failed to search presentations: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Mark attendance for a presentation (admin/staff only)
   */
  static async markAttendance(
    presentationId: number, 
    userId: number, 
    status: 'attended' | 'absent'
  ): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await httpClient.post<{ message: string }>(
        `${API_CONFIG.endpoints.presentations}${presentationId}/attendance/`,
        { user_id: userId, status }
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to mark attendance: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get presentation statistics (admin/staff only)
   */
  static async getPresentationStats(presentationId: number): Promise<ApiResponse<{
    total_registrations: number;
    attended_count: number;
    absent_count: number;
    pending_count: number;
    average_rating: number;
    feedback_count: number;
  }>> {
    try {
      const response = await httpClient.get<{
        total_registrations: number;
        attended_count: number;
        absent_count: number;
        pending_count: number;
        average_rating: number;
        feedback_count: number;
      }>(`${API_CONFIG.endpoints.presentations}${presentationId}/stats/`);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch presentation statistics: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}
