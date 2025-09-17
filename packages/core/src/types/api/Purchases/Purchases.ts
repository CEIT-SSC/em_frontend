import { PresentationOverview } from "../Presentation/presentation";

export interface SoloCompetition {
  id: number;
  event: number;
  event_title: string;
  title: string;
  description: string;
  start_datetime: string;
  end_datetime: string;
  poster: string;
  rules: string;
  is_paid: boolean;
  price_per_participant: string;
  prize_details: string;
  is_active: boolean;
  max_participants: number;
  created_at: string;
  remaining_capacity: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  features: string;
  is_active: boolean;
  created_at: string;
  capacity: number;
  event: number;
}

export interface PurchaseItem {
  presentations: PresentationOverview[];
  solo_competitions: SoloCompetition[];
  competition_teams: string;
  products: Product[];
}

export interface PurchasesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PurchaseItem[];
}
