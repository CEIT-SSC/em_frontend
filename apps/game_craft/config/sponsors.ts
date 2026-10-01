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
    id: "01",
    name: "incytel",
    logo: "/assets/images/sponsors/incytel.png",
    link: "https://www.incytel.com/",
    tier: "gold",
  },
];
