import { Presentation } from "../Presentation/presentation";

export enum ItemType {
  PRESENTATION = "presentation",
  SOLO_COMPETITION = "solo_competition",
  COMPETITION_TEAM = "competition_team",
}
export interface PriceObject {
  source: string;
  parsedValue: number;
}

export interface Cart {
  id?: number;
  user?: number;
  applied_discount_code: number | null;
  discount_code: string | null;
  presentations: Presentation[];
  solo_competitions: SoloCompetition[];
  competition_teams: CompetitionTeam[];
  products: unknown[];
  subtotal_amount: PriceObject;
  discount_amount: number;
  total_amount: PriceObject;
  created_at?: string;
}
export interface ItemDetails {
  item_type: ItemType;
  presentation?: Presentation;
  solo_competition?: SoloCompetition;
  competition_team?: CompetitionTeam;
}
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
}
export interface CompetitionTeam {
  leader_details: TeamLeader;
  group_competition_title: string;
  status: string;
  is_approved_by_admin: boolean;
  admin_remarks: string;
  memberships: Membership[];
  content_submission: ContentSubmission;
  created_at: string;
}
export interface TeamLeader {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  profile_picture: string;
}
export interface Membership {
  id: number;
  user_details: UserDetails;
  government_id_picture: string;
  joined_at: string;
}
export interface UserDetails {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  profile_picture: string;
}
export interface ContentSubmission {
  id: number;
  team: number;
  team_name: string;
  description: string;
  file_link: string;
  images: SubmissionImage[];
  likes_count: string;
  comments_count: string;
  is_liked_by_requester: string;
  created_at: string;
}
export interface SubmissionImage {
  id: number;
  image: string;
  caption: string;
  uploaded_at: string;
}
