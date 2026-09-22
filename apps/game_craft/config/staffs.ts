import { useTranslations } from "next-intl";

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
  const t = useTranslations("app.staffs");

  const organizingTeam: StaffTeam = {
    teamTitle: t("organizingTeam.title"),
    teamMembers: [
      {
        imageUrl: "/images/2026/staffs/AmirabbasEntezari.jpg",
        name: "امیرعباس انتظاری",
        role: "دبیر رویداد",
        telegramUrl: "https://t.me/amirabbas_entezari",
        githubUrl: "https://github.com/AmirabbasEntezari",
        linkedinUrl: "https://www.linkedin.com/in/amirabbas-entezari/",
      },
      {
        imageUrl: "/images/2025/staffs/MohammadJavadAkbari.jpg",
        name: "محمدجواد اکبری",
        role: "دبیر انجمن علمی",
        githubUrl: "https://github.com/Javad-Ak",
        linkedinUrl: "https://www.linkedin.com/in/mo-ja-akbari/",
        telegramUrl: "",
      },
    ],
  };

  const technicalTeam: StaffTeam = {
    teamTitle: t("technicalTeam.title"),
    teamMembers: [
      {
        imageUrl: "/images/2025/staffs/MoeinEnayati.png",
        name: "معین عنایتی",
        role: "سرپرست تیم فنی",
        telegramUrl: "https://t.me/moein_enayati",
        linkedinUrl: "https://www.linkedin.com/in/moein-enayati",
        githubUrl: "https://github.com/moeinEN",
      },
      {
        imageUrl: "/images/2025/staffs/MohammadJavadAkbari.jpg",
        name: "محمد جواد اکبری",
        role: "توسعه دهنده بک اند",
        githubUrl: "https://github.com/Javad-Ak",
        linkedinUrl: "https://www.linkedin.com/in/mo-ja-akbari/",
        telegramUrl: "",
      },
      {
        imageUrl: "/images/2025/staffs/AmirhosseinAghighi.jpg",
        name: "امیرحسین عقیقی",
        role: "توسعه دهنده فرانت اند",
        telegramUrl: "https://t.me/Amirhosseinaghighii",
        linkedinUrl: "https://www.linkedin.com/in/amirhossein-aghighi/",
        githubUrl: "https://github.com/AmirhosseinAghighi",
      },
      {
        imageUrl: "/images/2025/staffs/AlirezaNikooei.jpg",
        name: "علیرضا نیکوئی",
        role: "دوآپس",
        githubUrl: "https://github.com/alirezanikooei",
        linkedinUrl: "https://www.linkedin.com/in/alireza-nikooei-10655a1b5",
        telegramUrl: "https://t.me/Nikoooei",
      },
      {
        imageUrl: "/images/2025/staffs/PouryaFahimi.jpg",
        name: "پوریا فهیمی",
        role: "توسعه دهنده فرانت اند",
        telegramUrl: "https://t.me/pourito",
        linkedinUrl: "https://www.linkedin.com/in/pourya-fahimi/",
        githubUrl: "https://github.com/PouryaFahimi",
      },
      {
        imageUrl: "/images/2026/staffs/MohammadMirzakolahri.jpg",
        name: "محمد میرزاکلهری",
        role: "توسعه دهنده بک اند",
      },
      {
        imageUrl: "/images/2026/staffs/MahanZavari.jpg",
        name: "ماهان زواری",
        role: "توسعه دهنده بک اند",
      },
      {
        imageUrl: "/images/2026/staffs/ParsaExir.jpg",
        name: "پارسا اکسیر",
        role: "توسعه دهنده بک اند",
      },
    ],
  };

  const scientificTeam: StaffTeam = {
    teamTitle: t("scientificTeam.title"),
    teamMembers: [
      {
        imageUrl: "/images/2026/staffs/MehrdadAbedi.jpg",
        name: "مهرداد عابدی",
        role: "سرپرست تیم علمی",
      },
      {
        imageUrl: "/images/2026/staffs/AlirezaAtharifard.png",
        name: "علیرضا اطهری‌فرد",
        role: "عضو تیم علمی",
        telegramUrl: "https://t.me/araf8405",
        githubUrl: "https://github.com/Ar-Atharifard",
        linkedinUrl: "https://www.linkedin.com/in/alireza-atharifard-134b6830b",
      },
      {
        imageUrl: "/images/2026/staffs/KosarSohani.jpg",
        name: "کوثر سوهانی",
        role: "عضو تیم علمی",
      },
      {
        imageUrl: "/images/2026/staffs/MelikaGhasemipour.webp",
        name: "ملیکا قاسمی پور",
        role: "عضو تیم علمی",
        telegramUrl: "https://t.me/Melika0gh",
        githubUrl: "https://github.com/ghasemipour",
      },
      {
        imageUrl: "/images/2026/staffs/MohammadMirzakolahri.jpg",
        name: "محمد میرزاکلهری",
        role: "عضو تیم علمی",
      },
      {
        imageUrl: "/images/2026/staffs/ErfanRajabi.jpg",
        name: "عرفان رجبی",
        role: "عضو تیم علمی",
      },
      {
        imageUrl: "/images/2026/staffs/AliMoghaddam.jpg",
        name: "علی مقدم",
        role: "عضو تیم علمی",
        telegramUrl: "https://t.me/arteshman",
        githubUrl: "https://github.com/ARTESHMAN",
        linkedinUrl: "https://www.linkedin.com/in/alimoghaddam014",
      },
    ],
  };

  const graphicTeam: StaffTeam = {
    teamTitle: t("graphicTeam.title"),
    teamMembers: [
      {
        imageUrl: "/images/logo/default_prof_2026.jpg",
        name: "بهار رفیع نژاد",
        role: "سرپرست تیم گرافیک",
      },
      {
        imageUrl: "/images/2026/staffs/BehradHozouri.jpg",
        name: "بهراد حضوری",
        role: "طراح گرافیک",
        githubUrl: "https://github.com/BehradHZ",
      },
      {
        imageUrl: "/images/2026/staffs/AvinMihanDoust.jpg",
        name: "آوین میهن دوست",
        role: "طراح گرافیک",
      },
      {
        imageUrl: "/images/2026/staffs/MahyarMohammadgholiha.jpg",
        name: "مهیار محمدقلی ها",
        role: "طراح گرافیک",
      },
    ],
  };

  const marketingTeam: StaffTeam = {
    teamTitle: t("marketingTeam.title"),
    teamMembers: [
      {
        imageUrl: "/images/2026/staffs/AtaTorkmanizadeh.png",
        name: "عطا ترکمانی‌زاده",
        role: "سرپرست تیم مارکتینگ",
      },
      {
        imageUrl: "/images/2026/staffs/AlirezaAtharifard.png",
        name: "علیرضا اطهری‌فرد",
        role: "عضو تیم مارکتینگ",
        telegramUrl: "https://t.me/araf8405",
        githubUrl: "https://github.com/Ar-Atharifard",
        linkedinUrl: "https://www.linkedin.com/in/alireza-atharifard-134b6830b",
      },
      {
        imageUrl: "/images/2026/staffs/MediaEidi.jpg",
        name: "مدیا عیدی",
        role: "عضو تیم مارکتینگ",
      },
      {
        imageUrl: "/images/2026/staffs/ParsaAsadi.jpg",
        name: "پارسا اسدی",
        role: "عضو تیم مارکتینگ",
      },
      {
        imageUrl: "/images/2026/staffs/ArshiaHashemzadeh.jpg",
        name: "عرشیا هاشم زاده",
        role: "عضو تیم مارکتینگ",
      },
      {
        imageUrl: "/images/2026/staffs/HessamHosseinian.jpg",
        name: "حسام حسینیان",
        role: "عضو تیم مارکتینگ",
        telegramUrl: "https://t.me/WasHessam",
        githubUrl: "https://github.com/Hessam-Hosseinian",
        linkedinUrl: "https://www.linkedin.com/in/hessam-hosseinian",
      },
      {
        imageUrl: "/images/2026/staffs/MohammadrafiHajiliDoji.jpg",
        name: "محمدرفیع حاجیلی دوجی",
        role: "عضو تیم مارکتینگ",
        telegramUrl: "https://t.me/mrafi_hd",
        linkedinUrl: "https://www.linkedin.com/in/rafi-hd/",
      },
    ],
  };

  const contentCreationTeam: StaffTeam = {
    teamTitle: t("contentCreationTeam.title"),
    teamMembers: [
      {
        imageUrl: "/images/2026/staffs/AshkanChaji.jpg",
        name: "اشکان چاجی",
        role: "سرپرست تیم رسانه",
        telegramUrl: "https://t.me/Ash2563",
        linkedinUrl: "https://www.linkedin.com/in/ashkan-chaji-71493434b",
        githubUrl: "https://github.com/ashkanchaji",
      },
      {
        imageUrl: "/images/2026/staffs/HessamHosseinian.jpg",
        name: "حسام حسینیان",
        role: "عضو تیم رسانه",
        telegramUrl: "https://t.me/WasHessam",
        githubUrl: "https://github.com/Hessam-Hosseinian",
        linkedinUrl: "https://www.linkedin.com/in/hessam-hosseinian",
      },
    ],
  };

  const operationsTeam: StaffTeam = {
    teamTitle: t("operationsTeam.title"),
    teamMembers: [
      {
        imageUrl: "/images/2026/staffs/BitaGhiasvand.jpg",
        name: "بیتا قیاسوند",
        role: "سرپرست تیم اجرایی",
      },
      {
        imageUrl: "/images/2026/staffs/ParsaEmadi.png",
        name: "پارسا عمادی",
        role: "عضو تیم اجرایی",
      },
      {
        imageUrl: "/images/2026/staffs/MohammadHosseinMortezaei.jpg",
        name: "محمدحسین مرتضائی",
        role: "عضو تیم اجرایی",
      },
      {
        imageUrl: "/images/2026/staffs/AryaSahraei.jpg",
        name: "آریا صحرایی",
        role: "عضو تیم اجرایی",
      },
      {
        imageUrl: "/images/2026/staffs/BahramEmami.jpg",
        name: "بهرام امامی",
        role: "عضو تیم اجرایی",
      },
      {
        imageUrl: "/images/2026/staffs/MohammadMehdiGhorbi.png",
        name: "محمدمهدی قربی",
        role: "عضو تیم اجرایی",
      },
      {
        imageUrl: "/images/2026/staffs/AliMahdipourGanji.jpg",
        name: "علی مهدی‌پور گنجی",
        role: "عضو تیم اجرایی",
      },
      {
        imageUrl: "/images/2026/staffs/SeyedAliShirangi.jpg",
        name: "سیدعلی شیرنگی",
        role: "عضو تیم اجرایی",
      },
      {
        imageUrl: "/images/2026/staffs/AmirAtaSolgi.jpg",
        name: "امیرعطا سلگی",
        role: "عضو تیم اجرایی",
      },
      {
        imageUrl: "/images/2026/staffs/ParhamPouyan.png",
        name: "پرهام پویان",
        role: "عضو تیم اجرایی",
      },
      {
        imageUrl: "/images/2026/staffs/RominaGhaderAhmadi.jpg",
        name: "رومینا قادراحمدی",
        role: "عضو تیم اجرایی",
      },
      {
        imageUrl: "/images/2026/staffs/AmirRezaSalehi.jpg",
        name: "امیررضا صالحی",
        role: "عضو تیم اجرایی",
      },
      {
        imageUrl: "/images/2026/staffs/ErfanEftekhari.jpg",
        name: "عرفان افتخاری",
        role: "عضو تیم اجرایی",
      },
      {
        imageUrl: "/images/logo/default_prof_2026.jpg",
        name: "امیرپارسا مظفری",
        role: "عضو تیم اجرایی",
      },
      {
        imageUrl: "/images/2026/staffs/MohammadHassanZeighami.jpg",
        name: "محمدحسن ضیغمی",
        role: "عضو تیم اجرایی",
      },
      {
        imageUrl: "/images/logo/default_prof_2026.jpg",
        name: "نگار مدقق",
        role: "عضو تیم اجرایی",
      },
    ],
  };

  const decorationTeam: StaffTeam = {
    teamTitle: t("decorationTeam.title"),
    teamMembers: [
      {
        imageUrl: "/images/2026/staffs/HastiMohammadzadeh.jpg",
        name: "هستی محمدزاده",
        role: "سرپرست تیم تزئینات",
      },
      {
        imageUrl: "/images/2026/staffs/NeginNaderi.jpg",
        name: "نگین نادری",
        role: "عضو تیم تزئینات",
      },
      {
        imageUrl: "/images/2026/staffs/YaldaVasheghani.jpg",
        name: "یلدا واشقانی فراهانی",
        role: "عضو تیم تزئینات",
      },
      {
        imageUrl: "/images/2026/staffs/MasihMahdavinia.png",
        name: "مسیح مهدوی نیا",
        role: "عضو تیم تزئینات",
      },
      {
        imageUrl: "/images/2026/staffs/MohammadMehdiGhorbi.png",
        name: "محمدمهدی قربی",
        role: "عضو تیم تزئینات",
      },
      {
        imageUrl: "/images/2026/staffs/IlyaHamediBasir.jpg",
        name: "ایلیا حامدی بصیر",
        role: "عضو تیم تزئینات",
      },
      {
        imageUrl: "/images/logo/default_prof_2026.jpg",
        name: "امیرپارسا مظفری",
        role: "عضو تیم تزئینات",
      },
      {
        imageUrl: "/images/logo/default_prof_2026.jpg",
        name: "زهرا شفاعی",
        role: "عضو تیم تزئینات",
      },
      {
        imageUrl: "/images/logo/default_prof_2026.jpg",
        name: "ریحانه مرادی",
        role: "عضو تیم تزئینات",
      },
    ],
  };

  return [
    organizingTeam,
    technicalTeam,
    graphicTeam,
    scientificTeam,
    contentCreationTeam,
    marketingTeam,
    operationsTeam,
    decorationTeam,
  ];
}
