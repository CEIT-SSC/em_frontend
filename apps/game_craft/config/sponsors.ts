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
    id: "pasargad",
    name: "انرژی پاسارگاد",
    logo: "/assets/images/sponsors/Pasargad-energy.png",
    link: "https://www.yektanet.com/",
    tier: "platinum",
  },
  {
    id: "tafahom",
    name: "تفاهم",
    logo: "/assets/images/sponsors/Tafahom.png",
    link: "https://asiatech.ir",
    tier: "platinum",
  },
];
