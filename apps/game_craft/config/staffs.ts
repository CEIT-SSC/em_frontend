import {useTranslations} from 'next-intl';

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
                imageUrl: '/images/2025/staffs/DelaraamRoohani.jpg',
                name: 'دلارام روحانی',
                role: 'دبیر رویداد'
            },
            {
                imageUrl: '/images/2025/staffs/MohammadJavadAkbari.jpg',
                name: 'محمدجواد اکبری',
                role: 'دبیر انجمن علمی'
            },
        ]
    };

    const technicalTeam: StaffTeam = {
        teamTitle: t('technicalTeam.title'),
        teamMembers: [
            {
                imageUrl: '/images/2024/staffs/',
                name: 'امیرحسین عقیقی',
                role: 'سرپرست تیم فنی'
            },
            {
                imageUrl: '/images/2025/staffs/MohammadJavadAkbari.jpg',
                name: 'محمد جواد اکبری',
                role: 'توسعه دهنده بک اند'
            },
            {
                imageUrl: '/images/2025/staffs/PouryaFahimi.jpg',
                name: 'پوریا فهیمی',
                role: 'توسعه دهنده فرانت اند'
            },
            {
                imageUrl: '/images/2025/staffs/MahdiHaeri.jpg',
                name: 'مهدی حائری',
                role: 'توسعه دهنده فرانت اند'
            },
        ]
    };

    const scientificTeam: StaffTeam = {
        teamTitle: t('scientificTeam.title'),
        teamMembers: [
            {
                imageUrl: '/images/2025/staffs/AlirezaAtharifard.jpg',
                name: 'علیرضا اطهری فرد',
                role: 'سرپرست تیم علمی'
            },
            {
                imageUrl: '/images/2025/staffs/AlirezaSafari.jpg',
                name: 'علی رضا صفری ',
                role: 'عضو تیم علمی'
            },
            {
                imageUrl: '/images/2025/staffs/MoeinEnayati.png',
                name: 'معین عنایتی',
                role: 'عضو تیم علمی'
            },
            {
                imageUrl: '/images/2025/staffs/MahdiehTahami.jpg',
                name: 'مهدیه تهامی',
                role: 'عضو تیم علمی'
            },
            {
                imageUrl: '/images/2025/staffs/AminRezaeeyan.jpg',
                name: 'امین رضائیان ',
                role: 'عضو تیم علمی'
            },
            {
                imageUrl: '/images/2025/staffs/RezaAdinepour.jpg',
                name: 'رضا آدینه پور',
                role: 'عضو تیم علمی'
            },
            {
                imageUrl: '/images/2024/staffs/',
                name: 'علیرضا نیکوئی',
                role: 'عضو تیم علمی'
            },
        ]
    };

    const graphicTeam: StaffTeam = {
        teamTitle: t('graphicTeam.title'),
        teamMembers: [
            {
                imageUrl: '/images/2024/staffs/',
                name: 'بهراد حضوری ',
                role: 'طراح گرافیک'
            },
            {
                imageUrl: '/images/2024/staffs/',
                name: 'بهار رفیع نژاد',
                role: 'طراح گرافیک'
            },
            {
                imageUrl: '/images/2024/staffs/',
                name: 'فاطمه سادات موجانی',
                role: 'طراح گرافیک'
            },
            {
                imageUrl: '/images/2025/staffs/MoeinEnayati.png',
                name: 'معین عنایتی',
                role: 'طراح گرافیک'
            },
        ]
    };

    const marketingTeam: StaffTeam = {
        teamTitle: t('marketingTeam.title'),
        teamMembers: [
            {
                imageUrl: '/images/2025/staffs/PouryaFahimi.jpg',
                name: 'پوریا فهیمی',
                role: 'سرپرست تیم مارکتینگ'
            },
            {
                imageUrl: '/images/2025/staffs/RoseNazeri.jpg',
                name: 'رز ناظری',
                role: 'عضو تیم مارکتینگ'
            },
            {
                imageUrl: '/images/2025/staffs/MohammadrafiDavaji.jpg',
                name: 'محمد رفیع حاجیلی دوجی',
                role: 'عضو تیم مارکتینگ'
            },
            {
                imageUrl: '/images/2025/staffs/ArianMohseni.png',
                name: 'آرین محسنی',
                role: 'عضو تیم مارکتینگ'
            },
            {
                imageUrl: '/images/2025/staffs/ElnazBaharvand.jpg',
                name: 'الناز بهاروند',
                role: 'عضو تیم مارکتینگ'
            },
            {
                imageUrl: '/images/2025/staffs/MahdiNajibpour.png',
                name: 'مهدی نجیب پور',
                role: 'عضو تیم مارکتینگ'
            },
            {
                imageUrl: '/images/2025/staffs/AlirezaYousefpour.jpg',
                name: 'علیرضا یوسف پور',
                role: 'عضو تیم مارکتینگ'
            },
        ]
    };

    const contentCreationTeam: StaffTeam = {
        teamTitle: t('contentCreationTeam.title'),
        teamMembers: [
            {
                imageUrl: '/images/2025/staffs/AvaMostanbet.jpg',
                name: 'آوا مستنبط',
                role: 'سرپرست تیم رسانه'
            },
            {
                imageUrl: '/images/2025/staffs/ShadiYousefabadi.jpg',
                name: 'شادی یوسف آبادی',
                role: 'عضو تیم تزئینات'
            },
            {
                imageUrl: '/images/2025/staffs/AliAghaee.jpg',
                name: 'محمدعلی آقائی',
                role: 'عضو تیم رسانه'
            },
            {
                imageUrl: '/images/2025/staffs/',
                name: 'یسنا رضائیان',
                role: 'عضو تیم رسانه'
            },
            {
                imageUrl: '/images/2025/staffs/',
                name: 'پرنیان اصفهانیان',
                role: 'عضو تیم رسانه'
            },
        ]
    };

    const operationsTeam: StaffTeam = {
        teamTitle: t('operationsTeam.title'),
        teamMembers: [
            {
                imageUrl: '/images/2025/staffs/',
                name: 'شایسته اکبری',
                role: 'سرپرست تیم اجرایی'
            },
            {
                imageUrl: '/images/2025/staffs/HessamHosseinian.jpg',
                name: 'حسام حسینیان ',
                role: 'عضو تیم اجرایی'
            },
            {
                imageUrl: '/images/2025/staffs/MelikaGhasemipour.jpg',
                name: 'ملیکا قاسمی پور',
                role: 'عضو تیم اجرایی'
            },
            {
                imageUrl: '/images/2024/staffs/',
                name: 'علیرضا نوروزبیکی',
                role: 'عضو تیم اجرایی'
            },
            {
                imageUrl: '/images/2025/staffs/AliMohamadi.jpg',
                name: 'علی محمدی',
                role: 'عضو تیم اجرایی'
            },
            {
                imageUrl: '/images/2024/staffs/',
                name: 'امیر بیژه',
                role: 'عضو تیم اجرایی'
            },
            {
                imageUrl: '/images/2025/staffs/MatinDehghanipor.jpg',
                name: 'متین دهقانی پور',
                role: 'عضو تیم اجرایی'
            },
            {
                imageUrl: '/images/2025/staffs/AsalJlz.jpg',
                name: 'عسل جلیل زاده',
                role: 'عضو تیم اجرایی'
            },
            {
                imageUrl: '/images/2025/staffs/ShadiYousefabadi.jpg',
                name: 'شادی یوسف آبادی',
                role: 'عضو تیم تزئینات'
            },
            {
                imageUrl: '/images/2025/staffs/',
                name: 'پرنیان اصفهانیان',
                role: 'عضو تیم اجرایی'
            },
            {
                imageUrl: '/images/2025/staffs/ParsaSamareh.jpg',
                name: 'پارسا ثمره افسری',
                role: 'عضو تیم اجرایی'
            },
            {
                imageUrl: '/images/2024/staffs/',
                name: 'علی مقدم',
                role: 'عضو تیم اجرایی'
            },
            {
                imageUrl: '/images/2024/staffs/',
                name: 'محمد میرزاکلهری',
                role: 'عضو تیم اجرایی'
            },
            {
                imageUrl: '/images/2025/staffs/NargesTakallu.jpg',
                name: 'نرگس تکلو',
                role: 'عضو تیم اجرایی'
            },
            {
                imageUrl: '/images/2024/staffs/',
                name: 'یسنا رضائیان',
                role: 'عضو تیم اجرایی'
            },
            {
                imageUrl: '/images/2025/staffs/SetayeshYavari.jpg',
                name: 'ستایش یاوری',
                role: 'عضو تیم اجرایی'
            },
            {
                imageUrl: '/images/2025/staffs/ZahraSheikhi.jpg',
                name: 'زهرا شیخی',
                role: 'عضو تیم اجرایی'
            },
            {
                imageUrl: '/images/2024/staffs/',
                name: 'مهرداد عابدی',
                role: 'عضو تیم اجرایی'
            },
            {
                imageUrl: '/images/2024/staffs/',
                name: 'آرتینا همتی',
                role: 'عضو تیم اجرایی'
            },
            {
                imageUrl: '/images/2025/staffs/ParnianJavadi.jpg',
                name: 'پرنیان جوادی',
                role: 'عضو تیم اجرایی'
            },
            {
                imageUrl: '/images/2025/staffs/RezaAdinepour.jpg',
                name: 'رضا آدینه پور',
                role: 'عضو تیم اجرایی'
            },
            {
                imageUrl: '/images/2025/staffs/AmiraliZakeri.jpg',
                name: 'امیرعلی ذاکری',
                role: 'عضو تیم اجرایی'
            },
            {
                imageUrl: '/images/2024/staffs/',
                name: 'سروش نانبخش',
                role: 'عضو تیم اجرایی'
            },
            {
                imageUrl: '/images/2025/staffs/ArminaMotaghi.jpg',
                name: 'آرمینا متقی',
                role: 'عضو تیم اجرایی'
            },
        ]
    };

    const financeTeam: StaffTeam = {
        teamTitle: t('financeTeam.title'),
        teamMembers: [
            {
                imageUrl: '/images/2025/staffs/AmirabbasEntezari.jpg',
                name: 'امیرعباس انتظاری',
                role: 'اسپانسرشیپ'
            },
            {
                imageUrl: '/images/2025/staffs/SabaSeyedtabaei.jpg',
                name: 'صبا‌سیدطبایی',
                role: 'مسئول مالی'
            },
        ]
    };

    const decorationTeam: StaffTeam = {
        teamTitle: t('decorationTeam.title'),
        teamMembers: [
            {
                imageUrl: '/images/2025/staffs/AsalJlz.jpg',
                name: 'عسل جلیل زاده',
                role: 'سرپرست تیم تزئینات'
            },
            {
                imageUrl: '/images/2025/staffs/ShadiYousefabadi.jpg',
                name: 'شادی یوسف آبادی',
                role: 'عضو تیم تزئینات'
            },
            {
                imageUrl: '/images/2025/staffs/SetayeshYavari.jpg',
                name: 'ستایش یاوری',
                role: 'عضو تیم تزئینات'
            },
            {
                imageUrl: '/images/2025/staffs/ParnianJavadi.jpg',
                name: 'پرنیان جوادی',
                role: 'عضو تیم تزئینات'
            },
            {
                imageUrl: '/images/2025/staffs/AlirezaYousefpour.jpg',
                name: 'علیرضا یوسف پور',
                role: 'عضو تیم تزئینات'
            },
            {
                imageUrl: '/images/2025/staffs/ZahraSheikhi.jpg',
                name: 'زهرا شیخی',
                role: 'عضو تیم تزئینات'
            },
            {
                imageUrl: '/images/2025/staffs/NargesTakallu.jpg',
                name: 'نرگس تکلو',
                role: 'عضو تیم تزئینات'
            },
            {
                imageUrl: '/images/2024/staffs/',
                name: 'محمد عشرت‌آبادی',
                role: 'عضو تیم تزئینات'
            },
            {
                imageUrl: '/images/2024/staffs/',
                name: 'امیر بیژه',
                role: 'عضو تیم تزئینات'
            },
            {
                imageUrl: '/images/2024/staffs/',
                name: 'محمد میرزاکلهری',
                role: 'عضو تیم تزئینات'
            },
            {
                imageUrl: '/images/2024/staffs/',
                name: 'یسنا رضائیان',
                role: 'عضو تیم تزئینات'
            },
            {
                imageUrl: '/images/2024/staffs/',
                name: 'نگین عینی پور',
                role: 'عضو تیم تزئینات'
            },
            {
                imageUrl: '/images/2024/staffs/',
                name: 'حسین تقی زاده',
                role: 'عضو تیم تزئینات'
            },
            {
                imageUrl: '/images/2024/staffs/',
                name: 'مبینا هراتی',
                role: 'عضو تیم تزئینات'
            },
            {
                imageUrl: '/images/2024/staffs/',
                name: 'فاطمه شهریاری',
                role: 'عضو تیم تزئینات'
            },
            {
                imageUrl: '/images/2024/staffs/',
                name: 'نازلی شایان',
                role: 'عضو تیم تزئینات'
            },
        ]
    }

    return [
        organizingTeam,
        technicalTeam,
        graphicTeam,
        scientificTeam,
        contentCreationTeam,
        financeTeam,
        marketingTeam,
        operationsTeam,
        decorationTeam
    ];
}
