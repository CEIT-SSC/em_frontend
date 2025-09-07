import {useTranslations} from 'next-intl';

export interface StaffMember {
    imageUrl: string;
    name: string;
    role: string;
    githubUrl?: string;
    linkedinUrl?: string;
    telegramUrl?: string;
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
                role: 'دبیر رویداد',
                githubUrl: 'https://github.com/delaraamroohani',
                linkedinUrl: 'https://www.linkedin.com/in/delaraamroohani',
                telegramUrl: ''
            },
            {
                imageUrl: '/images/2025/staffs/MohammadJavadAkbari.jpg',
                name: 'محمدجواد اکبری',
                role: 'دبیر انجمن علمی',
                githubUrl: 'https://github.com/Javad-Ak',
                linkedinUrl: 'https://www.linkedin.com/in/mo-ja-akbari/',
                telegramUrl: ''
            },
        ]
    };

    const technicalTeam: StaffTeam = {
        teamTitle: t('technicalTeam.title'),
        teamMembers: [
            {
                imageUrl: '/images/2025/staffs/AmirhosseinAghighi.jpg',
                name: 'امیرحسین عقیقی',
                role: 'سرپرست تیم فنی',
                telegramUrl: 'https://t.me/Amirhosseinaghighii',
                linkedinUrl: 'https://www.linkedin.com/in/amirhossein-aghighi/',
                githubUrl: 'https://github.com/AmirhosseinAghighi'
            },
            {
                imageUrl: '/images/2025/staffs/MohammadJavadAkbari.jpg',
                name: 'محمد جواد اکبری',
                role: 'توسعه دهنده بک اند',
                githubUrl: 'https://github.com/Javad-Ak',
                linkedinUrl: 'https://www.linkedin.com/in/mo-ja-akbari/',
                telegramUrl: ''
            },
            {
                imageUrl: '/images/2025/staffs/PouryaFahimi.jpg',
                name: 'پوریا فهیمی',
                role: 'توسعه دهنده فرانت اند',
                telegramUrl: 'https://t.me/pouryaf289',
                linkedinUrl: 'https://www.linkedin.com/in/pourya-fahimi/',
                githubUrl: 'https://github.com/PouryaFahimi'
            },
            {
                imageUrl: '/images/2025/staffs/MahdiHaeri.jpg',
                name: 'مهدی حائری',
                role: 'توسعه دهنده فرانت اند',
                telegramUrl: 'https://t.me/Mahdi_Haeri',
                linkedinUrl: 'https://www.linkedin.com/in/mahdi-haeri-4406861b9/',
                githubUrl: 'https://github.com/MahdiHaeri'
            },
        ]
    };

    const scientificTeam: StaffTeam = {
        teamTitle: t('scientificTeam.title'),
        teamMembers: [
            {
                imageUrl: '/images/2025/staffs/AlirezaAtharifard.jpg',
                name: 'علیرضا اطهری فرد',
                role: 'سرپرست تیم علمی',
                telegramUrl: 'https://t.me/araf8405',
                githubUrl: 'https://github.com/Ar-Atharifard',
                linkedinUrl: 'https://www.linkedin.com/in/alireza-atharifard-134b6830b'
            },
            {
                imageUrl: '/images/2025/staffs/AlirezaSafari.jpg',
                name: 'علی رضا صفری ',
                role: 'عضو تیم علمی',
                telegramUrl: 'https://t.me/A4f_ss',
                linkedinUrl: 'https://www.linkedin.com/in/alireza-safari-3ba3942b8/',
                githubUrl: 'https://github.com/Alireza12ss'
            },
            {
                imageUrl: '/images/2025/staffs/MoeinEnayati.png',
                name: 'معین عنایتی',
                role: 'عضو تیم علمی',
                telegramUrl: 'https://t.me/moein_enayati',
                linkedinUrl: 'https://www.linkedin.com/in/moein-enayati',
                githubUrl: 'https://github.com/moeinEN'
            },
            {
                imageUrl: '/images/2025/staffs/MahdiehTahami.jpg',
                name: 'مهدیه تهامی',
                role: 'عضو تیم علمی',
                telegramUrl: '',
                linkedinUrl: 'https://www.linkedin.com/in/mahdieh-tahami?trk=contact-info',
                githubUrl: ''
            },
            {
                imageUrl: '/images/2025/staffs/AminRezaeeyan.jpg',
                name: 'امین رضائیان ',
                role: 'عضو تیم علمی',
                telegramUrl: 'https://t.me/aminrezaeeyan',
                githubUrl: 'https://github.com/AminRezaeeyan',
                linkedinUrl: 'https://linkedin.com/in/amin-rezaeeyan'
            },
            {
                imageUrl: '/images/2025/staffs/RezaAdinepour.jpg',
                name: 'رضا آدینه پور',
                role: 'عضو تیم علمی',
                telegramUrl: 'https://t.me/era144',
                githubUrl: 'https://github.com/rezaAdinepour',
                linkedinUrl: 'https://www.linkedin.com/in/adinepour'
            },
            {
                imageUrl: '',
                name: 'علیرضا نیکوئی',
                role: 'عضو تیم علمی',
                githubUrl: '',
                linkedinUrl: '',
                telegramUrl: ''
            },
        ]
    };

    const graphicTeam: StaffTeam = {
        teamTitle: t('graphicTeam.title'),
        teamMembers: [
            {
                imageUrl: '/images/2025/staffs/BehradHozouri.jpg',
                name: 'بهراد حضوری ',
                role: 'سرپرست تیم گرافیک',
                telegramUrl: '',
                githubUrl: 'https://github.com/BehradHZ',
                linkedinUrl: ''
            },
            {
                imageUrl: '',
                name: 'بهار رفیع نژاد',
                role: 'طراح گرافیک',
                githubUrl: '',
                linkedinUrl: '',
                telegramUrl: ''
            },
            {
                imageUrl: '/images/2025/staffs/FatemehSadatMoujani.jpeg',
                name: 'فاطمه سادات موجانی',
                role: 'طراح گرافیک',
                githubUrl: '',
                linkedinUrl: '',
                telegramUrl: 'https://t.me/FatemehMj82'
            },
            {
                imageUrl: '/images/2025/staffs/MoeinEnayati.png',
                name: 'معین عنایتی',
                role: 'طراح گرافیک',
                telegramUrl: 'https://t.me/moein_enayati',
                linkedinUrl: 'https://www.linkedin.com/in/moein-enayati',
                githubUrl: 'https://github.com/moeinEN'
            },
        ]
    };

    const marketingTeam: StaffTeam = {
        teamTitle: t('marketingTeam.title'),
        teamMembers: [
            {
                imageUrl: '/images/2025/staffs/PouryaFahimi.jpg',
                name: 'پوریا فهیمی',
                role: 'سرپرست تیم مارکتینگ',
                telegramUrl: 'https://t.me/pouryaf289',
                linkedinUrl: 'https://www.linkedin.com/in/pourya-fahimi/',
                githubUrl: 'https://github.com/PouryaFahimi'
            },
            {
                imageUrl: '/images/2025/staffs/RoseNazeri.jpg',
                name: 'رز ناظری',
                role: 'عضو تیم مارکتینگ',
                githubUrl: '',
                linkedinUrl: '',
                telegramUrl: ''
            },
            {
                imageUrl: '/images/2025/staffs/MohammadrafiDavaji.jpg',
                name: 'محمد رفیع حاجیلی دوجی',
                role: 'عضو تیم مارکتینگ',
                telegramUrl: 'https://t.me/mrafi_hd',
                githubUrl: '',
                linkedinUrl: 'https://www.linkedin.com/in/rafi-hd/'
            },
            {
                imageUrl: '/images/2025/staffs/ArianMohseni.png',
                name: 'آرین محسنی',
                role: 'عضو تیم مارکتینگ',
                telegramUrl: 'https://t.me/arianmhb',
                linkedinUrl: 'https://www.linkedin.com/in/arian-mohseni-348a6b24b',
                githubUrl: 'https://github.com/ArianArsenal'
            },
            {
                imageUrl: '/images/2025/staffs/ElnazBaharvand.jpg',
                name: 'الناز بهاروند',
                role: 'عضو تیم مارکتینگ',
                telegramUrl: '',
                linkedinUrl: '',
                githubUrl: ''
            },
            {
                imageUrl: '/images/2025/staffs/MahdiNajibpour.png',
                name: 'مهدی نجیب پور',
                role: 'عضو تیم مارکتینگ',
                telegramUrl: '',
                linkedinUrl: '',
                githubUrl: ''
            },
            {
                imageUrl: '/images/2025/staffs/AlirezaYousefpour.jpg',
                name: 'علیرضا یوسف پور',
                role: 'عضو تیم مارکتینگ',
                telegramUrl: 'https://t.me/AlirezaYousefpourM',
                linkedinUrl: 'https://www.linkedin.com/in/alireza-yousefpour-98492b24b/',
                githubUrl: 'https://github.com/AlirezaYousefpourM'
            },
        ]
    };

    const contentCreationTeam: StaffTeam = {
        teamTitle: t('contentCreationTeam.title'),
        teamMembers: [
            {
                imageUrl: '/images/2025/staffs/AvaMostanbet.jpg',
                name: 'آوا مستنبط',
                role: 'سرپرست تیم رسانه',
                telegramUrl: '',
                githubUrl: '',
                linkedinUrl: ''
            },
            {
                imageUrl: '/images/2025/staffs/ShadiYousefabadi.jpg',
                name: 'شادی یوسف آبادی',
                role: 'عضو تیم رسانه',
                githubUrl: '',
                linkedinUrl: '',
                telegramUrl: ''
            },
            {
                imageUrl: '/images/2025/staffs/AliAghaee.jpg',
                name: 'محمدعلی آقائی',
                role: 'عضو تیم رسانه',
                githubUrl: '',
                linkedinUrl: '',
                telegramUrl: ''
            },
            {
                imageUrl: '/images/2025/staffs/AshkanChaji.jpg',
                name: 'اشکان چاجی',
                role: 'عضو تیم رسانه',
                telegramUrl: 'https://t.me/Ash2563',
                linkedinUrl: 'https://www.linkedin.com/in/ashkan-chaji-71493434b',
                githubUrl: 'https://github.com/ashkanchaji'
            },
            {
                imageUrl: '/images/2025/staffs/hero.gif',
                name: 'یسنا رضائیان',
                role: 'عضو تیم رسانه',
                githubUrl: '',
                linkedinUrl: '',
                telegramUrl: ''
            },
            {
                imageUrl: '/images/2025/staffs/ParnianEsfahani.jpg',
                name: 'پرنیان اصفهانیان',
                role: 'عضو تیم رسانه',
                telegramUrl: '',
                githubUrl: '',
                linkedinUrl: ''
            },
        ]
    };

    const operationsTeam: StaffTeam = {
        teamTitle: t('operationsTeam.title'),
        teamMembers: [
            {
                imageUrl: '',
                name: 'شایسته اکبری',
                role: 'سرپرست تیم اجرایی',
                githubUrl: '',
                linkedinUrl: '',
                telegramUrl: ''
            },
            {
                imageUrl: '/images/2025/staffs/HessamHosseinian.jpg',
                name: 'حسام حسینیان ',
                role: 'عضو تیم اجرایی',
                telegramUrl: 'https://t.me/WasHessam',
                githubUrl: 'https://github.com/Hessam-Hosseinian',
                linkedinUrl: 'https://www.linkedin.com/in/hessam-hosseinian'
            },
            {
                imageUrl: '/images/2025/staffs/MelikaGhasemipour.jpg',
                name: 'ملیکا قاسمی پور',
                role: 'عضو تیم اجرایی',
                telegramUrl: 'https://t.me/Melika0gh',
                githubUrl: 'https://github.com/ghasemipour',
                linkedinUrl: ''
            },
            {
                imageUrl: '',
                name: 'علیرضا نوروزبیکی',
                role: 'عضو تیم اجرایی',
                githubUrl: '',
                linkedinUrl: '',
                telegramUrl: ''
            },
            {
                imageUrl: '/images/2025/staffs/AliMohamadi.jpg',
                name: 'علی محمدی',
                role: 'عضو تیم اجرایی',
                telegramUrl: 'https://t.me/alimhm_20',
                githubUrl: '',
                linkedinUrl: ''
            },
            {
                imageUrl: '',
                name: 'امیر بیژه',
                role: 'عضو تیم اجرایی',
                githubUrl: '',
                linkedinUrl: '',
                telegramUrl: ''
            },
            {
                imageUrl: '/images/2025/staffs/MatinDehghanipor.jpg',
                name: 'متین دهقانی پور',
                role: 'عضو تیم اجرایی',
                telegramUrl: 'https://t.me/MatinDehghanipor',
                githubUrl: 'https://github.com/MatinDehghanipor',
                linkedinUrl: 'https://www.linkedin.com/in/matin-dehghanipor-4594a6312'
            },
            {
                imageUrl: '/images/2025/staffs/AsalJlz.jpg',
                name: 'عسل جلیل زاده',
                role: 'عضو تیم اجرایی',
                githubUrl: 'https://github.com/asal-jlz',
                linkedinUrl: 'https://www.linkedin.com/in/asal-jlz/',
                telegramUrl: 'https://t.me/lost_butterfly7'
            },
            {
                imageUrl: '/images/2025/staffs/ShadiYousefabadi.jpg',
                name: 'شادی یوسف آبادی',
                role: 'عضو تیم اجرایی',
                githubUrl: '',
                linkedinUrl: '',
                telegramUrl: ''
            },
            {
                imageUrl: '/images/2025/staffs/ParnianEsfahani.jpg',
                name: 'پرنیان اصفهانیان',
                role: 'عضو تیم اجرایی',
                telegramUrl: '',
                githubUrl: '',
                linkedinUrl: ''
            },
            {
                imageUrl: '/images/2025/staffs/ParsaSamareh.jpg',
                name: 'پارسا ثمره افسری',
                role: 'عضو تیم اجرایی',
                telegramUrl: 'https://t.me/parsasamaf',
                linkedinUrl: 'https://www.linkedin.com/in/parsa-samareh-b850b1382',
                githubUrl: 'https://github.com/parsa0s0a'
            },
            {
                imageUrl: '/images/2025/staffs/AliMoghaddam.jpg',
                name: 'علی مقدم',
                role: 'عضو تیم اجرایی',
                telegramUrl: 'https://t.me/arteshman',
                githubUrl: 'https://github.com/ARTESHMAN',
                linkedinUrl: 'https://www.linkedin.com/in/alimoghaddam014'
            },
            {
                imageUrl: '',
                name: 'محمد میرزاکلهری',
                role: 'عضو تیم اجرایی',
                githubUrl: '',
                linkedinUrl: '',
                telegramUrl: ''
            },
            {
                imageUrl: '/images/2025/staffs/NargesTakallu.jpg',
                name: 'نرگس تکلو',
                role: 'عضو تیم اجرایی',
                telegramUrl: 'https://t.me/thediferente',
                githubUrl: '',
                linkedinUrl: ''
            },
            {
                imageUrl: '/images/2025/staffs/hero.gif',
                name: 'یسنا رضائیان',
                role: 'عضو تیم اجرایی',
                githubUrl: '',
                linkedinUrl: '',
                telegramUrl: ''
            },
            {
                imageUrl: '/images/2025/staffs/SetayeshYavari.jpg',
                name: 'ستایش یاوری',
                role: 'عضو تیم اجرایی',
                telegramUrl: '',
                githubUrl: '',
                linkedinUrl: ''
            },
            {
                imageUrl: '/images/2025/staffs/ZahraSheikhi.jpg',
                name: 'زهرا شیخی',
                role: 'عضو تیم اجرایی',
                telegramUrl: 'https://t.me/Zrsh_22',
                githubUrl: 'https://github.com/Zrsh_26',
                linkedinUrl: ''
            },
            {
                imageUrl: '',
                name: 'مهرداد عابدی',
                role: 'عضو تیم اجرایی',
                githubUrl: '',
                linkedinUrl: '',
                telegramUrl: ''
            },
            {
                imageUrl: '',
                name: 'آرتینا همتی',
                role: 'عضو تیم اجرایی',
                githubUrl: '',
                linkedinUrl: '',
                telegramUrl: ''
            },
            {
                imageUrl: '/images/2025/staffs/ParnianJavadi.jpg',
                name: 'پرنیان جوادی',
                role: 'عضو تیم اجرایی',
                telegramUrl: 'https://t.me/OnceAGoldenGhost',
                linkedinUrl: '',
                githubUrl: ''
            },
            {
                imageUrl: '/images/2025/staffs/RezaAdinepour.jpg',
                name: 'رضا آدینه پور',
                role: 'عضو تیم اجرایی',
                telegramUrl: 'https://t.me/era144',
                githubUrl: 'https://github.com/rezaAdinepour',
                linkedinUrl: 'https://www.linkedin.com/in/adinepour'
            },
            {
                imageUrl: '/images/2025/staffs/AmiraliZakeri.jpg',
                name: 'امیرعلی ذاکری',
                role: 'عضو تیم اجرایی',
                telegramUrl: '',
                linkedinUrl: 'http://linkedin.com/in/amirali-zakeri-3262352a3',
                githubUrl: ''
            },
            {
                imageUrl: '/images/2025/staffs/SoroushNanbakhsh.jpg',
                name: 'سروش نانبخش',
                role: 'عضو تیم اجرایی',
                githubUrl: '',
                linkedinUrl: 'https://www.linkedin.com/in/soroush-nanbakhsh-032725256',
                telegramUrl: 'https://t.me/Soroush_Nanbakhsh'
            },
            {
                imageUrl: '/images/2025/staffs/ArminaMotaghi.jpg',
                name: 'آرمینا متقی',
                role: 'عضو تیم اجرایی',
                telegramUrl: 'https://t.me/anna_mi3',
                linkedinUrl: 'https://www.linkedin.com/in/armina-motaghi-844966382/',
                githubUrl: 'https://github.com/Arminamotaghi'
            },
        ]
    };

    const financeTeam: StaffTeam = {
        teamTitle: t('financeTeam.title'),
        teamMembers: [
            {
                imageUrl: '/images/2025/staffs/AmirabbasEntezari.jpg',
                name: 'امیرعباس انتظاری',
                role: 'اسپانسرشیپ',
                telegramUrl: 'https://t.me/amirabbas_entezari',
                githubUrl: 'https://github.com/AmirabbasEntezari',
                linkedinUrl: 'https://www.linkedin.com/in/amirabbas-entezari/'
            },
            {
                imageUrl: '/images/2025/staffs/SabaSeyedtabaei.jpg',
                name: 'صبا‌سیدطبایی',
                role: 'مسئول مالی',
                telegramUrl: 'https://t.me/Sab_St',
                githubUrl: 'https://github.com/hiiambobby',
                linkedinUrl: 'https://www.linkedin.com/in/saba-seyed-tabaei-00b582248'
            },
        ]
    };

    const decorationTeam: StaffTeam = {
        teamTitle: t('decorationTeam.title'),
        teamMembers: [
            {
                imageUrl: '/images/2025/staffs/AsalJlz.jpg',
                name: 'عسل جلیل زاده',
                role: 'سرپرست تیم تزئینات',
                githubUrl: 'https://github.com/asal-jlz',
                linkedinUrl: 'https://www.linkedin.com/in/asal-jlz/?originalSubdomain=ir',
                telegramUrl: 'https://t.me/lost_butterfly7'
            },
            {
                imageUrl: '/images/2025/staffs/ShadiYousefabadi.jpg',
                name: 'شادی یوسف آبادی',
                role: 'عضو تیم تزئینات',
                githubUrl: '',
                linkedinUrl: '',
                telegramUrl: ''
            },
            {
                imageUrl: '/images/2025/staffs/SetayeshYavari.jpg',
                name: 'ستایش یاوری',
                role: 'عضو تیم تزئینات',
                telegramUrl: '',
                githubUrl: '',
                linkedinUrl: ''
            },
            {
                imageUrl: '/images/2025/staffs/ParnianJavadi.jpg',
                name: 'پرنیان جوادی',
                role: 'عضو تیم تزئینات',
                telegramUrl: 'https://t.me/OnceAGoldenGhost',
                linkedinUrl: '',
                githubUrl: ''
            },
            {
                imageUrl: '/images/2025/staffs/AlirezaYousefpour.jpg',
                name: 'علیرضا یوسف پور',
                role: 'عضو تیم تزئینات',
                telegramUrl: 'https://t.me/AlirezaYousefpourM',
                linkedinUrl: 'https://www.linkedin.com/in/alireza-yousefpour-98492b24b/',
                githubUrl: 'https://github.com/AlirezaYousefpourM'
            },
            {
                imageUrl: '/images/2025/staffs/ZahraSheikhi.jpg',
                name: 'زهرا شیخی',
                role: 'عضو تیم تزئینات',
                telegramUrl: 'https://t.me/Zrsh_22',
                githubUrl: 'https://github.com/Zrsh_26',
                linkedinUrl: ''
            },
            {
                imageUrl: '/images/2025/staffs/NargesTakallu.jpg',
                name: 'نرگس تکلو',
                role: 'عضو تیم تزئینات',
                telegramUrl: 'https://t.me/thediferente',
                githubUrl: '',
                linkedinUrl: ''
            },
            {
                imageUrl: '/images/2025/staffs/MohammadEshratabadi.jpg',
                name: 'محمد عشرت‌آبادی',
                role: 'عضو تیم تزئینات',
                githubUrl: 'https://github.com/AAEA132',
                linkedinUrl: 'https://www.linkedin.com/in/mohammad-eshratabadi',
                telegramUrl: ''
            },
            {
                imageUrl: '',
                name: 'امیر بیژه',
                role: 'عضو تیم تزئینات',
                githubUrl: '',
                linkedinUrl: '',
                telegramUrl: ''
            },
            {
                imageUrl: '',
                name: 'محمد میرزاکلهری',
                role: 'عضو تیم تزئینات',
                githubUrl: '',
                linkedinUrl: '',
                telegramUrl: ''
            },
            {
                imageUrl: '/images/2025/staffs/hero.gif',
                name: 'یسنا رضائیان',
                role: 'عضو تیم تزئینات',
                githubUrl: '',
                linkedinUrl: '',
                telegramUrl: ''
            },
            {
                imageUrl: '',
                name: 'نگین عینی پور',
                role: 'عضو تیم تزئینات',
                githubUrl: '',
                linkedinUrl: '',
                telegramUrl: ''
            },
            {
                imageUrl: '',
                name: 'حسین تقی زاده',
                role: 'عضو تیم تزئینات',
                githubUrl: '',
                linkedinUrl: '',
                telegramUrl: ''
            },
            {
                imageUrl: '',
                name: 'مبینا هراتی',
                role: 'عضو تیم تزئینات',
                githubUrl: '',
                linkedinUrl: '',
                telegramUrl: ''
            },
            {
                imageUrl: '',
                name: 'فاطمه شهریاری',
                role: 'عضو تیم تزئینات',
                githubUrl: '',
                linkedinUrl: '',
                telegramUrl: ''
            },
            {
                imageUrl: '',
                name: 'نازلی شایان',
                role: 'عضو تیم تزئینات',
                githubUrl: '',
                linkedinUrl: '',
                telegramUrl: ''
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

