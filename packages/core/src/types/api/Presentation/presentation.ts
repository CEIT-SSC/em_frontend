export type PresentationId = number;

export interface PresenterDetail {
  id: PresentationId;
  name: string;
  email: string;
  bio: string;
  presenter_picture: string;
  created_at: string; // ISO datetime
}

export enum PresentationType {
  COURSE = "course",
  TALK = "talk",
  WORKSHOP = "workshop",
}

export interface Presentation {
  id: PresentationId;
  event: number;
  event_title: string;
  title: string;
  description: string;
  presenters_details: PresenterDetail[];
  type: PresentationType;
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
  poster: string;
}

export type PresentationOverview = Pick<
  Presentation,
  | "id"
  | "event"
  | "event_title"
  | "title"
  | "description"
  | "presenters_details"
  | "type"
  | "is_online"
  | "location"
  | "online_link"
  | "start_time"
  | "end_time"
  | "is_paid"
  | "price"
  | "capacity"
  | "is_active"
  | "poster"
>;

export type PresentationsList = {
  count: number;
  next: string;
  previous: string;
  results: PresentationOverview[];
};
