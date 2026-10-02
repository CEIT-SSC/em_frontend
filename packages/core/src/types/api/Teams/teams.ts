import { GroupCompetitionDetails } from "../competitions/competitions";

export type TeamsList = {
  count: number;
  next: string;
  previous: string;
  results: TeamDetails[];
};

export interface TeamDetails {
  id: number;
  name: string;
  leader_details: LeaderDetails;
  /** Deprecated single-competition projection; use registrations. */
  group_competition_details: GroupCompetitionDetails;
  status: string;
  is_approved_by_admin: boolean;
  admin_remarks: string;
  memberships: Membership[];
  content_submission: ContentSubmission;
  created_at: string;
  management_status: "forming";
  accepted_member_count: number;
  registrations: TeamCompetitionRegistration[];
}

export type TeamRegistrationStatus = "pending_approval" | "pending_payment" | "active" | "rejected" | "cancelled";

export interface TeamCompetitionRegistration {
  id: number;
  competition_details: GroupCompetitionDetails;
  status: TeamRegistrationStatus;
  price: string;
  member_ids: number[];
  content_submission: ContentSubmission | null;
  order_item: number | null;
  reviewed_by: number | null;
  reviewed_at: string | null;
  admin_remarks: string;
  activated_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface LeaderDetails {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  profile_picture: string;
}

export interface Membership {
  id: number;
  user_details: UserDetails;
  status: "pending" | "accepted" | "rejected" | "expired";
  joined_at: string;
  invited_by: number | null;
  expires_at: string | null;
  responded_at: string | null;
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
  images: Image[];
  likes_count: number;
  comments_count: number;
  is_liked_by_requester: boolean;
  created_at: string;
}

export interface Image {
  id: number;
  image: string;
  caption: string;
  uploaded_at: string;
}

export interface CreateTeamRequest {
  team_name: string;
  member_emails: string[];
}

export interface CreateTeamResponse {
  team_name: string;
  member_emails: string[];
}

export interface RegisterCompetitionRequest {
  description?: string;
  file_link?: string;
  uploaded_images?: string[];
}

export interface RegisterCompetitionResponse {
  success: boolean;
  statusCode: number;
  message: string;
  errors: Record<string, unknown>;
  data: TeamDetails;
}

export interface SubmitContentRequest {
  description?: string;
  file_link?: string;
  uploaded_images?: string[];
}

export interface SubmitContentResponse {
  success: boolean;
  statusCode: number;
  message: string;
  errors: Record<string, unknown>;
  data: ContentSubmission;
}

export interface AddMemberRequest {
  email: string;
}

export interface AddMemberResponse {
  success: boolean;
  statusCode: number;
  message: string;
  errors: Record<string, unknown>;
  data: Membership;
}

export interface MembershipRequest {
  id: number;
  team: number;
  team_name: string;
  user_details: UserDetails;
  status: string;
  requested_at: string;
}

export interface MembershipRequestsList {
  count: number;
  next: string;
  previous: string;
  results: TeamDetails[];
}

export interface AcceptMembershipResponse {
  success: boolean;
  statusCode: number;
  message: string;
  errors: Record<string, unknown>;
  data: Membership;
}

export interface RejectMembershipResponse {
  success: boolean;
  statusCode: number;
  message: string;
  errors: Record<string, unknown>;
}

export interface TeamPaymentResponse {
  success: boolean;
  statusCode: number;
  message: string;
  errors: object;
  data: PaymentData;
}
export interface PaymentData {
  payment_url: string | null;
  payment_required: boolean;
  topup_id: string | null;
  wallet_balance: string;
}
