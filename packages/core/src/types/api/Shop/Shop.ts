import { Presentation } from "../Presentation/presentation";

export enum ItemType {
  PRESENTATION = "presentation",
  SOLO_COMPETITION = "solo_competition",
  COMPETITION_TEAM = "competition_team",
}

export interface Cart {
  success: true;
  statusCode: 200;
  message: "Request was successful.";
  errors: object;
  data: {
    id: number;
    user: number;
    applied_discount_code: number;
    discount_code: string;
    items: CartItem[];
    subtotal_amount: string;
    discount_amount: string;
    total_amount: string;
    created_at: string; // ISO datetime
  };
}

export interface CartItem {
  id: number;
  content_type: number;
  object_id: number;
  item_details: ItemDetails;
  price: string;
  added_at: string; // ISO datetime
  event_id: string;
  status: string;
  reserved_order_id: string;
  reserved_order_item_id: string;
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
  start_datetime: string; // ISO datetime
  end_datetime: string; // ISO datetime
  poster: string;
  rules: string;
  is_paid: boolean;
  price_per_participant: string;
  prize_details: string;
  is_active: boolean;
  max_participants: number;
  created_at: string; // ISO datetime
}

export interface CompetitionTeam {
  leader_details: TeamLeader;
  group_competition_title: string;
  status: string; // e.g. "pending_admin_verification"
  is_approved_by_admin: boolean;
  admin_remarks: string;
  memberships: Membership[];
  content_submission: ContentSubmission;
  created_at: string; // ISO datetime
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
  joined_at: string; // ISO datetime
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
  created_at: string; // ISO datetime
}

export interface SubmissionImage {
  id: number;
  image: string;
  caption: string;
  uploaded_at: string; // ISO datetime
}
