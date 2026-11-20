import abbas from "~/assets/members/abbas.jpg";
import ashkan from "~/assets/members/ashkan.jpg";
import delaraam from "~/assets/members/delaraam.png";
import javad from "~/assets/members/javad.jpg";
import alireza from "~/assets/members/alireza.png";
import behrad from "~/assets/members/behrad.jpg";
import saba from "~/assets/members/saba.jpg";
import moein20 from "~/assets/members/gen20/MoeinEnayati.png";
import parham20 from "~/assets/members/gen20/ParhamPouyan.png";
import amirhossein20 from "~/assets/members/gen20/AmirhosseinAghighi.jpg";
import ali20 from "~/assets/members/gen20/AliMahdipourGanji.jpg";
import hessam20 from "~/assets/members/gen20/HessamHosseinian.jpg";
import erfan20 from "~/assets/members/gen20/ErfanRajabi.jpg";
import bahram20 from "~/assets/members/gen20/BahramEmami.jpg";

export interface TeamMember {
  name: string;
  position: string;
  photoUrl: string;
  githubUrl?: string;
  linkedinUrl?: string;
}

export interface TeamGeneration {
  number: number;
  archived: boolean;
  /** Optional term dates, written for display in Persian. */
  termLabel?: string;
  members: TeamMember[];
}

/** Add a generation rather than overwriting an old roster.
 * Mark past generations archived to include them on /members.
 * Once the next roster is ready, change homepageGeneration to its number.
 */
export const teamConfig: { homepageGeneration: number; generations: TeamGeneration[] } = {
  homepageGeneration: 20,
  generations: [
    {
      number: 20,
      archived: false,
      // Portraits copied from GameCraft's named staff records in config/staffs.ts.
      members: [
        { name: "معین عنایتی", position: "دبیر انجمن", photoUrl: moein20.src, githubUrl: "https://github.com/moeinEN", linkedinUrl: "https://www.linkedin.com/in/moein-enayati" },
        { name: "پرهام پویان", position: "مسئول مالی", photoUrl: parham20.src },
        { name: "امیرحسین عقیقی", position: "مسئول ارتباط با صنعت", photoUrl: amirhossein20.src, githubUrl: "https://github.com/AmirhosseinAghighi", linkedinUrl: "https://www.linkedin.com/in/amirhossein-aghighi/" },
        { name: "علی مهدی‌پور گنجی", position: "مسئول آموزشی", photoUrl: ali20.src },
        { name: "سید حسام‌الدین حسینیان", position: "مسئول مسابقات", photoUrl: hessam20.src, githubUrl: "https://github.com/Hessam-Hosseinian", linkedinUrl: "https://www.linkedin.com/in/hessam-hosseinian" },
        { name: "عرفان رجبی", position: "مسئول انفورماتیک", photoUrl: erfan20.src, githubUrl: "https://github.com/erfan8566", linkedinUrl: "https://linkedin.com/in/erfan-rajabi-79426a355" },
        { name: "بهرام امامی", position: "مسئول روابط عمومی", photoUrl: bahram20.src, githubUrl: "https://github.com/BahramEmami", linkedinUrl: "https://www.linkedin.com/in/bahram-emami-60ab56316" },
      ],
    },
    {
      number: 19,
      archived: true,
      members: [
        { name: "محمدجواد اکبری", position: "دبیر انجمن", photoUrl: javad.src, githubUrl: "https://github.com/Javad-Ak", linkedinUrl: "https://www.linkedin.com/in/mo-ja-akbari/" },
        { name: "صبا سیدطبایی", position: "مسئول مالی", photoUrl: saba.src, linkedinUrl: "https://www.linkedin.com/in/saba-seyed-tabaei" },
        { name: "امیرعباس انتظاری", position: "مسئول ارتباط با صنعت", photoUrl: abbas.src, githubUrl: "https://github.com/AmirabbasEntezari" },
        { name: "دلارام روحانی", position: "مسئول آموزشی", photoUrl: delaraam.src, linkedinUrl: "https://www.linkedin.com/in/delaraamroohani" },
        { name: "اشکان چاجی", position: "مسئول مسابقات", photoUrl: ashkan.src, githubUrl: "https://github.com/ashkan-chaji", linkedinUrl: "https://www.linkedin.com/in/ashkan-chaji-71493434b/" },
        { name: "علیرضا صفری", position: "مسئول انفورماتیک", photoUrl: alireza.src, githubUrl: "https://github.com/Alireza12ss", linkedinUrl: "https://www.linkedin.com/in/alireza-safari-3ba3942b8/" },
        { name: "بهراد حضوری", position: "مسئول روابط عمومی", photoUrl: behrad.src, githubUrl: "https://github.com/BehradHZ" },
      ],
    },
  ],
};

export function getHomepageGeneration(): TeamGeneration {
  const generation = teamConfig.generations.find(generation => generation.number === teamConfig.homepageGeneration);
  if (!generation) throw new Error(`Homepage team generation ${teamConfig.homepageGeneration} is missing from teamConfig`);
  return generation;
}

export function getArchivedGenerations(): TeamGeneration[] {
  return teamConfig.generations.filter(generation => generation.archived).sort((a, b) => b.number - a.number);
}
