export interface MyTeams {
  id: number
  name: string
  leader_details: LeaderDetails
  group_competition_details: GroupCompetitionDetails
  status: string
  is_approved_by_admin: boolean
  admin_remarks: string
  memberships: Membership[]
  content_submission: ContentSubmission
  created_at: string
}

export interface LeaderDetails {
  id: number
  email: string
  first_name: string
  last_name: string
  profile_picture: string
}

export interface GroupCompetitionDetails {
  id: number
  event: number
  event_title: string
  title: string
  description: string
  start_datetime: string
  end_datetime: string
  rules: string
  is_paid: boolean
  price_per_member: string
  prize_details: string
  is_active: boolean
  poster: string
  min_group_size: number
  max_group_size: number
  max_teams: number
  requires_admin_approval: boolean
  member_verification_instructions: string
  allow_content_submission: boolean
  created_at: string
  remaining_capacity: number
}

export interface Membership {
  id: number
  user_details: UserDetails
  status: string
  joined_at: string
}

export interface UserDetails {
  id: number
  email: string
  first_name: string
  last_name: string
  profile_picture: string
}

export interface ContentSubmission {
  id: number
  team: number
  team_name: string
  description: string
  file_link: string
  images: Image[]
  likes_count: number
  comments_count: number
  is_liked_by_requester: boolean
  created_at: string
}

export interface Image {
  id: number
  image: string
  caption: string
  uploaded_at: string
}
