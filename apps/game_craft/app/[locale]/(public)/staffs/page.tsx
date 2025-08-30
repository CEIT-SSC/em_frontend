import { StaffView } from '@/components/shared/StaffView';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('staffs.title'),
    description: t('staffs.description'),
  };
}

export default function StaffsPage() {
  return <StaffView />;
}
