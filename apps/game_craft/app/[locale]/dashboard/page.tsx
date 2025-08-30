import { redirect } from 'next/navigation'

interface DashboardPageProps {
  params: Promise<{ locale: string }>
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { locale } = await params

  // Redirect to events page as the default dashboard page with proper locale
  redirect(`/${locale}/dashboard/events`)
}
