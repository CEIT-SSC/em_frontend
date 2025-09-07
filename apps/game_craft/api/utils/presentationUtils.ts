import type { Presentation, PresentationFilterParams } from '../types';

/**
 * Utility functions for presentations
 */
export class PresentationUtils {
  /**
   * Check if a presentation is currently happening
   */
  static isLive(presentation: Presentation): boolean {
    const now = new Date();
    const startTime = new Date(presentation.start_time);
    const endTime = new Date(presentation.end_time);
    
    return now >= startTime && now <= endTime;
  }

  /**
   * Check if a presentation is upcoming
   */
  static isUpcoming(presentation: Presentation): boolean {
    const now = new Date();
    const startTime = new Date(presentation.start_time);
    
    return startTime > now;
  }

  /**
   * Check if a presentation has ended
   */
  static hasEnded(presentation: Presentation): boolean {
    const now = new Date();
    const endTime = new Date(presentation.end_time);
    
    return endTime < now;
  }

  /**
   * Get presentation status
   */
  static getStatus(presentation: Presentation): 'upcoming' | 'live' | 'ended' {
    if (this.isLive(presentation)) return 'live';
    if (this.isUpcoming(presentation)) return 'upcoming';
    return 'ended';
  }

  /**
   * Format presentation duration
   */
  static formatDuration(presentation: Presentation): string {
    const startTime = new Date(presentation.start_time);
    const endTime = new Date(presentation.end_time);
    const durationMs = endTime.getTime() - startTime.getTime();
    const durationMinutes = Math.floor(durationMs / (1000 * 60));
    
    if (durationMinutes < 60) {
      return `${durationMinutes} دقیقه`;
    }
    
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    
    if (minutes === 0) {
      return `${hours} ساعت`;
    }
    
    return `${hours} ساعت و ${minutes} دقیقه`;
  }

  /**
   * Format presentation date
   */
  static formatDate(presentation: Presentation, locale: 'fa' | 'en' = 'fa'): string {
    const startTime = new Date(presentation.start_time);
    
    if (locale === 'fa') {
      return new Intl.DateTimeFormat('fa-IR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(startTime);
    }
    
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(startTime);
  }

  /**
   * Format presentation time range
   */
  static formatTimeRange(presentation: Presentation, locale: 'fa' | 'en' = 'fa'): string {
    const startTime = new Date(presentation.start_time);
    const endTime = new Date(presentation.end_time);
    
    const timeFormat: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: locale === 'en',
    };
    
    const startFormatted = new Intl.DateTimeFormat(locale === 'fa' ? 'fa-IR' : 'en-US', timeFormat).format(startTime);
    const endFormatted = new Intl.DateTimeFormat(locale === 'fa' ? 'fa-IR' : 'en-US', timeFormat).format(endTime);
    
    return `${startFormatted} - ${endFormatted}`;
  }

  /**
   * Check if registration is available
   */
  static canRegister(presentation: Presentation): boolean {
    const registeredCount = presentation.registered_count || 0;
    return (
      presentation.is_active &&
      this.isUpcoming(presentation) &&
      registeredCount < presentation.capacity &&
      !presentation.is_registered
    );
  }

  /**
   * Check if presentation is full
   */
  static isFull(presentation: Presentation): boolean {
    const registeredCount = presentation.registered_count || 0;
    return registeredCount >= presentation.capacity;
  }

  /**
   * Get registration status message
   */
  static getRegistrationStatus(presentation: Presentation, locale: 'fa' | 'en' = 'fa'): string {
    if (!presentation.is_active) {
      return locale === 'fa' ? 'غیرفعال' : 'Inactive';
    }
    
    if (this.hasEnded(presentation)) {
      return locale === 'fa' ? 'پایان یافته' : 'Ended';
    }
    
    if (this.isLive(presentation)) {
      return locale === 'fa' ? 'در حال برگزاری' : 'Live Now';
    }
    
    if (presentation.is_registered) {
      return locale === 'fa' ? 'ثبت نام شده' : 'Registered';
    }
    
    if (this.isFull(presentation)) {
      return locale === 'fa' ? 'ظرفیت تکمیل' : 'Full';
    }
    
    return locale === 'fa' ? 'قابل ثبت نام' : 'Available';
  }

  /**
   * Get presentation level badge color
   */
  static getLevelColor(level: string): string {
    switch (level) {
      case 'beginner':
        return 'green';
      case 'intermediate':
        return 'orange';
      case 'advanced':
        return 'red';
      default:
        return 'blue';
    }
  }

  /**
   * Get presentation type badge color
   */
  static getTypeColor(type: string): string {
    switch (type) {
      case 'workshop':
        return 'purple';
      case 'talk':
        return 'blue';
      case 'panel':
        return 'cyan';
      case 'demo':
        return 'magenta';
      default:
        return 'default';
    }
  }

  /**
   * Filter presentations by date range
   */
  static filterByDateRange(
    presentations: Presentation[], 
    startDate?: Date, 
    endDate?: Date
  ): Presentation[] {
    return presentations.filter(presentation => {
      const presentationDate = new Date(presentation.start_time);
      
      if (startDate && presentationDate < startDate) return false;
      if (endDate && presentationDate > endDate) return false;
      
      return true;
    });
  }

  /**
   * Sort presentations by start time
   */
  static sortByStartTime(presentations: Presentation[], ascending: boolean = true): Presentation[] {
    return [...presentations].sort((a, b) => {
      const timeA = new Date(a.start_time).getTime();
      const timeB = new Date(b.start_time).getTime();
      
      return ascending ? timeA - timeB : timeB - timeA;
    });
  }

  /**
   * Group presentations by date
   */
  static groupByDate(presentations: Presentation[]): Record<string, Presentation[]> {
    return presentations.reduce((groups, presentation) => {
      const date = new Date(presentation.start_time).toISOString().split('T')[0];
      
      if (!groups[date]) {
        groups[date] = [];
      }
      
      groups[date].push(presentation);
      
      return groups;
    }, {} as Record<string, Presentation[]>);
  }

  /**
   * Get available spots count
   */
  static getAvailableSpots(presentation: Presentation): number {
    const registeredCount = presentation.registered_count || 0;
    return Math.max(0, presentation.capacity - registeredCount);
  }

  /**
   * Calculate completion percentage
   */
  static getCompletionPercentage(presentation: Presentation): number {
    const registeredCount = presentation.registered_count || 0;
    return Math.round((registeredCount / presentation.capacity) * 100);
  }

  /**
   * Get presentation price display
   */
  static getPriceDisplay(presentation: Presentation, locale: 'fa' | 'en' = 'fa'): string {
    if (!presentation.is_paid) {
      return locale === 'fa' ? 'رایگان' : 'Free';
    }
    
    const price = parseFloat(presentation.price);
    if (locale === 'fa') {
      return `${price.toLocaleString('fa-IR')} تومان`;
    } else {
      return `$${price.toFixed(2)}`;
    }
  }

  /**
   * Get presentation format
   */
  static getFormat(presentation: Presentation, locale: 'fa' | 'en' = 'fa'): string {
    if (presentation.is_online) {
      return locale === 'fa' ? 'آنلاین' : 'Online';
    } else {
      return locale === 'fa' ? 'حضوری' : 'In-person';
    }
  }

  /**
   * Get presentation location display
   */
  static getLocationDisplay(presentation: Presentation): string {
    if (presentation.is_online) {
      return presentation.online_link || 'Online';
    } else {
      return presentation.location || 'TBA';
    }
  }

  /**
   * Get presenter names
   */
  static getPresenterNames(presentation: Presentation): string {
    return presentation.presenters_details.map(p => p.name).join(', ');
  }

  /**
   * Get first presenter
   */
  static getMainPresenter(presentation: Presentation) {
    return presentation.presenters_details[0] || null;
  }

  /**
   * Generate search params for API call
   */
  static buildSearchParams(filters: {
    search?: string;
    category?: string;
    level?: string;
    type?: string;
    language?: string;
    dateFrom?: Date;
    dateTo?: Date;
    tags?: string[];
    featured?: boolean;
  }): PresentationFilterParams {
    const params: PresentationFilterParams = {};
    
    if (filters.search) params.search = filters.search;
    if (filters.category) params.category = filters.category;
    if (filters.level) params.level = filters.level as any;
    if (filters.type) params.type = filters.type as any;
    if (filters.language) params.language = filters.language as any;
    if (filters.dateFrom) params.date_from = filters.dateFrom.toISOString().split('T')[0];
    if (filters.dateTo) params.date_to = filters.dateTo.toISOString().split('T')[0];
    if (filters.tags && filters.tags.length > 0) params.tags = filters.tags;
    if (filters.featured !== undefined) params.is_featured = filters.featured;
    
    return params;
  }
}
