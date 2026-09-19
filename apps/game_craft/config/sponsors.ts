export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  link: string;
  tier: "platinum" | "gold" | "silver";
}

// name and description of sponsors comes from translation files using id
export const sponsors: Sponsor[] = [
  {
    id: "tafahom",
    name: "تفاهم",
    logo: "/assets/images/sponsors/Tafahom.png",
    link: "https://aitdco.com/fa/",
    tier: "platinum",
  },
];
