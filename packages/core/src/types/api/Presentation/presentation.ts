export type PresentationId = number;

export interface PresenterDetail {
  id: PresentationId;
  name: string;
  email: string;
  bio: string;
  presenter_picture: string;
  created_at: string; // ISO datetime
}

export interface Presentation {
  id: PresentationId;
  event: number;
  event_title: string;
  title: string;
  description: string;
  presenters_details: PresenterDetail[];
  type: string;
  is_online: boolean;
  location: string;
  online_link: string;
  start_time: string; // ISO datetime
  end_time: string; // ISO datetime
  is_paid: boolean;
  price: string;
  capacity: number;
  created_at: string; // ISO datetime
  is_active: boolean;
}

export type PresentationOverview = Pick<
  Presentation,
  "id" | "title" | "description" | "is_active"
> & {
  start_date: string;
  end_date: string;
  poster: string;
  landing_url: string;
  manager: string;
};

export type PresentationsList = {
  count: number;
  next: string;
  previous: string;
  results: PresentationOverview[];
};
