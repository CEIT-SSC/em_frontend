import { useTranslations } from 'next-intl';

export interface StaffMember {
  imageUrl: string;
  name: string;
  role: string;
}

export interface StaffTeam {
  teamTitle: string;
  teamMembers: StaffMember[];
}

export function useStaffs(): StaffTeam[] {
  const t = useTranslations('app.staffs');

  const organizingTeam: StaffTeam = {
    teamTitle: t('organizingTeam.title'),
    teamMembers: [
      {
        imageUrl: '/images/2024/staffs/bitaShayegan.jpg',
        name: 'بیتا شایگان',
        role: 'دبیر رویداد'
      },
      {
        imageUrl: '/images/2024/staffs/arminHamedazimi.jpg',
        name: 'آرمین حامدعظیمی',
        role: 'دبیر انجمن علمی'
      },
    ]
  };

  const technicalTeam: StaffTeam = {
    teamTitle: t('technicalTeam.title'),
    teamMembers: [
      {
        imageUrl: '/images/2024/staffs/alirezaZare.png',
        name: 'علیرضا زارع',
        role: 'سرپرست تیم فنی'
      },
      {
        imageUrl: '/images/2024/staffs/alirezaYousefpour.jpg',
        name: 'علیرضا یوسف پور',
        role: 'توسعه دهنده و اسکرام مستر'
      },
      {
        imageUrl: '/images/2024/staffs/sinaSadeghi.jpg',
        name: 'سینا صادقی',
        role: 'دواپس'
      },
      {
        imageUrl: '/images/2024/staffs/mohammadJavadAkbari.jpg',
        name: 'محمد جواد اکبری',
        role: 'توسعه دهنده بک اند'
      },
      {
        imageUrl: '/images/2024/staffs/pouryaFahimi.png',
        name: 'پوریا فهیمی',
        role: 'توسعه دهنده فرانت اند'
      },
      {
        imageUrl: '/images/2024/staffs/mahdiHaeri.jpg',
        name: 'مهدی حائری',
        role: 'توسعه دهنده فرانت اند'
      },
    ]
  };

  const scientificTeam: StaffTeam = {
    teamTitle: t('scientificTeam.title'),
    teamMembers: [
      {
        imageUrl: '/images/2024/staffs/mahdiehTahami.jpg',
        name: 'مهدیه تهامی',
        role: 'سرپرست تیم علمی'
      },
      {
        imageUrl: '/images/2024/staffs/amirabbasEntezari.jpg',
        name: 'امیرعباس انتظاری',
        role: 'عضو تیم علمی'
      },
      {
        imageUrl: '/images/2024/staffs/sabaSeyedtabaei.jpg',
        name: 'صبا سیدطبایی',
        role: 'عضو تیم علمی'
      },
    ]
  };

  const graphicTeam: StaffTeam = {
    teamTitle: t('graphicTeam.title'),
    teamMembers: [
      {
        imageUrl: '/images/2024/staffs/baharRafinezhad.jpg',
        name: 'بهار رفیع نژاد',
        role: 'طراح گرافیک'
      },
    ]
  };

  const marketingTeam: StaffTeam = {
    teamTitle: t('marketingTeam.title'),
    teamMembers: [
      {
        imageUrl: '/images/2024/staffs/mostafaDallaki.png',
        name: 'مصطفی دلاکی',
        role: 'سرپرست تیم مارکتینگ'
      },
      {
        imageUrl: '/images/2024/staffs/sobhan.png',
        name: 'سبحان حیدری',
        role: 'عضو تیم مارکتینگ'
      },
      {
        imageUrl: '/images/2024/staffs/mahdiNajibpour.png',
        name: 'مهدی نجیب پور',
        role: 'عضو تیم مارکتینگ'
      },
      {
        imageUrl: '/images/2024/staffs/arianMohseni.png',
        name: 'آرین محسنی',
        role: 'عضو تیم مارکتینگ'
      },
      {
        imageUrl: '/images/2024/staffs/mohammadRafiHajiliDavaji.png',
        name: 'محمد رفیع حاجیلی دوجی',
        role: 'عضو تیم مارکتینگ'
      },
      {
        imageUrl: '/images/2024/staffs/delaraamRoohani.png',
        name: 'دلارام روحانی',
        role: 'عضو تیم مارکتینگ'
      },
      {
        imageUrl: '/images/2024/staffs/arshiyaHashemzadeh.jpg',
        name: 'عرشیا هاشم‌زاده',
        role: 'عضو تیم مارکتینگ'
      },
    ]
  };

  const contentCreationTeam: StaffTeam = {
    teamTitle: t('contentCreationTeam.title'),
    teamMembers: [
      {
        imageUrl: '/images/2024/staffs/mohamadaliHajifathali.png',
        name: 'محمدعلی حاجی فتحعلی',
        role: 'سرپرست تیم رسانه'
      },
      {
        imageUrl: '/images/2024/staffs/ashkanChaji.png',
        name: 'اشکان چاجی',
        role: 'عضو تیم رسانه'
      }
    ]
  };

  const operationsTeam: StaffTeam = {
    teamTitle: t('operationsTeam.title'),
    teamMembers: [
      {
        imageUrl: '/images/2024/staffs/seyedAliDastan.png',
        name: 'سیدعلی محمد داستان',
        role: 'عضو تیم اجرایی'
      },
      {
        imageUrl: '/images/2024/staffs/poor3a.jpg',
        name: 'پوریا صادقی',
        role: 'عضو تیم اجرایی'
      },
      {
        imageUrl: '/images/2024/staffs/amirhosseinSabouri.jpg',
        name: 'امیرحسین صبوری خسروشاهی',
        role: 'عضو تیم اجرایی'
      },
    ]
  };

  const financeTeam: StaffTeam = {
    teamTitle: t('financeTeam.title'),
    teamMembers: [
      {
        imageUrl: '/images/2024/staffs/leila.jpeg',
        name: 'لیلا',
        role: 'اسپانسرشیپ'
      },
      {
        imageUrl: '/images/2024/staffs/bagherHosseini.png',
        name: 'باقر حسینی',
        role: 'مسئول مالی'
      },
      {
        imageUrl: '/images/2024/staffs/parsaHamidi.png',
        name: 'پارسا حمیدی',
        role: 'مسئول مالی'
      },
    ]
  };

  return [
    organizingTeam,
    technicalTeam,
    scientificTeam,
    marketingTeam,
    operationsTeam,
    contentCreationTeam,
    financeTeam,
    graphicTeam,
  ];
}
