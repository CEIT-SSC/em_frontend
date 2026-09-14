import { PresentationOverview } from "../Presentation/presentation";

export interface PackProduct {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string | null;
}

export interface PackCompetition {
  id: number;
  title: string;
  description: string;
  price_per_participant: string;
}

export interface Pack {
  id: number;
  name: string;
  description: string;
  image: string | null;
  event: number | null;
  is_active: boolean;
  calculated_price: string;
  real_price: string;
  presentations: PresentationOverview[];
  solo_competitions: PackCompetition[];
  products: PackProduct[];
  created_at: string;
}

export interface PacksList {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pack[];
}
