export interface Sponsor {
    id: string;
    logo: string;
    link: string;
    tier: 'platinum' | 'gold' | 'silver';
}

// name and description of sponsors comes from translation files using id
export const sponsors: Sponsor[] = [
    {
        id: "yektanet",
        logo: "/assets/images/sponsors/yektanet.png",
        link: "https://www.yektanet.com/",
        tier: "platinum"
    },
    {
        id: "asiaTech",
        logo: "/assets/images/sponsors/asiatech.png",
        link: "https://asiatech.ir",
        tier: "platinum"
    },
    {
        id: "incytelGames",
        logo: "/assets/images/sponsors/incytelGames.png",
        link: "https://www.incytel.com",
        tier: "gold"
    },
    {
        id: "blackcubegames",
        logo: "/assets/images/sponsors/black-cube.png",
        link: "https://blackcubegames.com/",
        tier: "gold"
    },
    {
        id: "pgj",
        logo: "/assets/images/sponsors/pgj.png",
        link: "https://persiangj.ir",
        tier: "gold"
    },
];
