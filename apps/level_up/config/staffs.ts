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
        imageUrl: "/images/2025/staffs/AmirabbasEntezari.jpg",
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
        imageUrl: "/images/2025/staffs/AmirhosseinAghighi.jpg",
        name: "امیرحسین عقیقی",
        role: "سرپرست تیم فنی",
        telegramUrl: "https://t.me/Amirhosseinaghighii",
        linkedinUrl: "https://www.linkedin.com/in/amirhossein-aghighi/",
        githubUrl: "https://github.com/AmirhosseinAghighi",
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
        imageUrl: "/images/2025/staffs/MoeinEnayati.png",
        name: "معین عنایتی",
        role: "توسعه دهنده بک اند و دوآپس",
        telegramUrl: "https://t.me/moein_enayati",
        linkedinUrl: "https://www.linkedin.com/in/moein-enayati",
        githubUrl: "https://github.com/moeinEN",
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
        telegramUrl: "https://t.me/pouryaf289",
        linkedinUrl: "https://www.linkedin.com/in/pourya-fahimi/",
        githubUrl: "https://github.com/PouryaFahimi",
      },
      {
        imageUrl: "/images/2025/staffs/MahdiHaeri.jpg",
        name: "مهدی حائری",
        role: "توسعه دهنده فرانت اند",
        telegramUrl: "https://t.me/Mahdi_Haeri",
        linkedinUrl: "https://www.linkedin.com/in/mahdi-haeri-4406861b9/",
        githubUrl: "https://github.com/MahdiHaeri",
      },
    ],
  };

  const scientificTeam: StaffTeam = {
    teamTitle: t("scientificTeam.title"),
    teamMembers: [
        {
        imageUrl: "/images/2025/staffs/AmirabbasEntezari.jpg",
        name: "امیرعباس انتظاری",
        role: "سرپرست تیم علمی",
        telegramUrl: "https://t.me/amirabbas_entezari",
        githubUrl: "https://github.com/AmirabbasEntezari",
        linkedinUrl: "https://www.linkedin.com/in/amirabbas-entezari/",
      },
      {
        imageUrl: "/images/2025/staffs/AlirezaSafari.jpg",
        name: "علی رضا صفری ",
        role: "عضو تیم علمی",
        telegramUrl: "https://t.me/A4f_ss",
        linkedinUrl: "https://www.linkedin.com/in/alireza-safari-3ba3942b8/",
        githubUrl: "https://github.com/Alireza12ss",
      },
      {
        imageUrl: "/images/2025/staffs/MohammadJavadAkbari.jpg",
        name: "محمدجواد اکبری",
        role: "عضو تیم علمی",
        githubUrl: "https://github.com/Javad-Ak",
        linkedinUrl: "https://www.linkedin.com/in/mo-ja-akbari/",
        telegramUrl: "",
      },
    ],
  };

  return [
    organizingTeam,
    technicalTeam,
    scientificTeam,
  ];
}
