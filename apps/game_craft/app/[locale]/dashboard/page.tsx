import { redirect } from 'next/navigation'

export default function DashboardPage() {
  // Redirect to events page as the default dashboard page
  redirect('/dashboard/events')
}
