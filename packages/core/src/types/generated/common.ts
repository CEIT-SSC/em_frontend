// Shared common types used across multiple API modules

export interface ErrorResponse {
  error: string;
}

export interface MessageResponse {
  message: string;
}

// Pagination wrapper
export interface PaginatedResponse<T> {
  count: number;
  next?: string;
  previous?: string;
  results: T[];
}
