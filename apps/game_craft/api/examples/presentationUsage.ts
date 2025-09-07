import { PresentationService, PresentationUtils } from '../index';
import type { Presentation, PresentationFilterParams } from '../types';

/**
 * Example usage of the updated Presentation API
 */

// Example 1: Get presentations for a specific event
async function getGameCraftPresentations() {
  try {
    const response = await PresentationService.getPresentations({
      event: 202501, // GameCraft 2025
    });

    if (response.success && response.data) {
      console.log(`Found ${response.data.count} presentations for GameCraft 2025`);
      
      response.data.results.forEach(presentation => {
        console.log(`
          Title: ${presentation.title}
          Type: ${presentation.type}
          Presenters: ${PresentationUtils.getPresenterNames(presentation)}
          Format: ${PresentationUtils.getFormat(presentation)}
          Price: ${PresentationUtils.getPriceDisplay(presentation)}
          Status: ${PresentationUtils.getRegistrationStatus(presentation)}
          Available Spots: ${PresentationUtils.getAvailableSpots(presentation)}
        `);
      });
    }
  } catch (error) {
    console.error('Failed to fetch presentations:', error);
  }
}

// Example 2: Filter presentations by type and payment
async function getWorkshopsAndTalks() {
  try {
    const filters: PresentationFilterParams = {
      event: 202501,
      type: 'workshop',
      is_paid: false, // Free workshops only
      is_active: true,
    };

    const response = await PresentationService.getPresentations(filters);
    
    if (response.success && response.data) {
      console.log('Free workshops:', response.data.results);
    }
  } catch (error) {
    console.error('Failed to fetch workshops:', error);
  }
}

// Example 3: Get a specific presentation with details
async function getPresentationDetails(id: number) {
  try {
    const response = await PresentationService.getPresentation(id);
    
    if (response.success && response.data) {
      const presentation = response.data;
      
      console.log(`
        Presentation Details:
        Title: ${presentation.title}
        Description: ${presentation.description}
        Event: ${presentation.event_title}
        
        Presenters:
        ${presentation.presenters_details.map(p => `
          - ${p.name} (${p.email})
          - Bio: ${p.bio}
        `).join('')}
        
        Details:
        - Type: ${presentation.type}
        - Format: ${presentation.is_online ? 'Online' : 'In-person'}
        - Location: ${PresentationUtils.getLocationDisplay(presentation)}
        - Duration: ${PresentationUtils.formatDuration(presentation)}
        - Price: ${PresentationUtils.getPriceDisplay(presentation)}
        - Capacity: ${presentation.capacity}
        - Available Spots: ${PresentationUtils.getAvailableSpots(presentation)}
        
        Schedule:
        - Start: ${PresentationUtils.formatDate(presentation)}
        - Time: ${PresentationUtils.formatTimeRange(presentation)}
        - Status: ${PresentationUtils.getStatus(presentation)}
      `);
    }
  } catch (error) {
    console.error('Failed to fetch presentation details:', error);
  }
}

// Example 4: Check presentation availability and register
async function registerForPresentationIfAvailable(presentationId: number) {
  try {
    // First get the presentation details
    const response = await PresentationService.getPresentation(presentationId);
    
    if (response.success && response.data) {
      const presentation = response.data;
      
      // Check if registration is possible
      if (PresentationUtils.canRegister(presentation)) {
        console.log('Registration is available, attempting to register...');
        
        // Register for the presentation
        const registerResponse = await PresentationService.registerForPresentation({
          presentation_id: presentationId
        });
        
        if (registerResponse.success) {
          console.log('Successfully registered for presentation!');
          console.log('Registration details:', registerResponse.data);
        }
      } else {
        const status = PresentationUtils.getRegistrationStatus(presentation);
        console.log(`Cannot register. Status: ${status}`);
        
        if (PresentationUtils.isFull(presentation)) {
          console.log('Presentation is full');
        } else if (PresentationUtils.hasEnded(presentation)) {
          console.log('Presentation has already ended');
        } else if (!presentation.is_active) {
          console.log('Presentation is not active');
        }
      }
    }
  } catch (error) {
    console.error('Failed to register for presentation:', error);
  }
}

// Example 5: Search and filter presentations
async function searchPresentations() {
  try {
    const searchFilters: PresentationFilterParams = {
      event: 202501,
      search: 'P1', // Search in title/description
      type: 'workshop',
      is_online: false, // In-person only
      ordering: 'start_time', // Sort by start time
    };

    const response = await PresentationService.getPresentations(searchFilters);
    
    if (response.success && response.data) {
      console.log('Search results:');
      
      // Group presentations by date
      const groupedByDate = PresentationUtils.groupByDate(response.data.results);
      
      Object.entries(groupedByDate).forEach(([date, presentations]) => {
        console.log(`\nDate: ${date}`);
        presentations.forEach(p => {
          console.log(`  - ${p.title} (${PresentationUtils.formatTimeRange(p)})`);
        });
      });
    }
  } catch (error) {
    console.error('Search failed:', error);
  }
}

// Example 6: Get presentation statistics
function analyzePresentation(presentation: Presentation) {
  const analysis = {
    title: presentation.title,
    event: presentation.event_title,
    mainPresenter: PresentationUtils.getMainPresenter(presentation),
    allPresenters: PresentationUtils.getPresenterNames(presentation),
    format: PresentationUtils.getFormat(presentation),
    location: PresentationUtils.getLocationDisplay(presentation),
    price: PresentationUtils.getPriceDisplay(presentation),
    duration: PresentationUtils.formatDuration(presentation),
    status: PresentationUtils.getStatus(presentation),
    registrationStatus: PresentationUtils.getRegistrationStatus(presentation),
    availableSpots: PresentationUtils.getAvailableSpots(presentation),
    completionPercentage: PresentationUtils.getCompletionPercentage(presentation),
    canRegister: PresentationUtils.canRegister(presentation),
    isFull: PresentationUtils.isFull(presentation),
    isLive: PresentationUtils.isLive(presentation),
    isUpcoming: PresentationUtils.isUpcoming(presentation),
    hasEnded: PresentationUtils.hasEnded(presentation),
  };
  
  return analysis;
}

// Export examples for use
export {
  getGameCraftPresentations,
  getWorkshopsAndTalks,
  getPresentationDetails,
  registerForPresentationIfAvailable,
  searchPresentations,
  analyzePresentation,
};
