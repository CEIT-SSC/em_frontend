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
  group_competition_details: GroupCompetitionDetails;
  status: string;
  is_approved_by_admin: boolean;
  admin_remarks: string;
  memberships: Membership[];
  content_submission: ContentSubmission;
  created_at: string;
}

export interface LeaderDetails {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  profile_picture: string;
}

export interface GroupCompetitionDetails {
  id: number;
  event: number;
  event_title: string;
  title: string;
  description: string;
  start_datetime: string;
  end_datetime: string;
  rules: string;
  is_paid: boolean;
  price_per_member: string;
  prize_details: string;
  is_active: boolean;
  poster: string;
  min_group_size: number;
  max_group_size: number;
  max_teams: number;
  requires_admin_approval: boolean;
  member_verification_instructions: string;
  allow_content_submission: boolean;
  created_at: string;
  remaining_capacity: number;
}

export interface Membership {
  id: number;
  user_details: UserDetails;
  status: string;
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
