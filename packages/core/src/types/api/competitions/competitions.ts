export type GroupCompetitionsList = {
  count: number;
  next: string;
  previous: string;
  results: GroupCompetitionDetails[];
};

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