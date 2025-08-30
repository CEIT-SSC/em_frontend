import { DashboardLayout } from '@/components/layout/DashboardLayout';

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function Layout({ children, params }: DashboardLayoutProps) {
  const { locale } = await params;

  return (
    <DashboardLayout locale={locale}>
      {children}
    </DashboardLayout>
  );
}
