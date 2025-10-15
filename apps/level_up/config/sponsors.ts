export interface Sponsor {
    id: string;
    logo: string;
    link: string;
    tier: 'platinum' | 'gold' | 'silver';
}

// name and description of sponsors comes from translation files using id
export const sponsors: Sponsor[] = [
    {
        id: "Liara",
        logo: "/assets/images/sponsors/liara.png",
        link: "https://liara.ir/",
        tier: "gold"
    },
];
