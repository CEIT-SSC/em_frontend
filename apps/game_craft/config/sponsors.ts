export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  description: string;
  link: string;
  tier: 'platinum' | 'gold' | 'silver';
}

export const sponsors: Sponsor[] = [
  {
    id: "yektanet",
    name: "Yektanet",
    logo: "/assets/images/sponsors/yektanet.png",
    description: "Cafe Bazaar is Iran's largest Android app marketplace, providing a platform for mobile applications and games. They support the gaming community by sponsoring events and promoting innovative mobile gaming solutions.",
    link: "https://www.yektanet.com/",
    tier: "platinum"
  },
  {
    id: "asiaTech",
    name: "Asia Tech",
    logo: "/assets/images/sponsors/asiatech.png",
    description: "Cafe Bazaar is Iran's largest Android app marketplace, providing a platform for mobile applications and games. They support the gaming community by sponsoring events and promoting innovative mobile gaming solutions.",
    link: "https://asiatech.ir",
    tier: "platinum"
  },
  {
    id: "incytelGames",
    name: "Incytel Games",
    logo: "/assets/images/sponsors/incytelGames.png",
    description: "Incytel Games is a leading game development company specializing in mobile and web-based games. They are committed to advancing the gaming industry through cutting-edge technology and creative gameplay.",
    link: "https://www.incytel.com",
    tier: "gold"
  },
  {
    id: "snappFood",
    name: "SnappFood",
    logo: "/assets/images/sponsors/snappfood.png",
    description: "Incytel Games is a leading game development company specializing in mobile and web-based games. They are committed to advancing the gaming industry through cutting-edge technology and creative gameplay.",
    link: "https://snappfood.ir",
    tier: "gold"
  },
  {
    id: "pgj",
    name: "PGJ",
    logo: "/assets/images/sponsors/pgj.png",
    description: "Incytel Games is a leading game development company specializing in mobile and web-based games. They are committed to advancing the gaming industry through cutting-edge technology and creative gameplay.",
    link: "https://persiangj.ir",
    tier: "gold"
  },
  // {
  //   id: "dropout",
  //   name: "Dropout",
  //   logo: "/assets/images/sponsors/dropout.png",
  //   description: "Dropout is a creative gaming studio focused on developing innovative and engaging games. They are passionate about supporting the gaming community and fostering creativity in game development.",
  //   link: "https://dropout.games",
  //   tier: "gold"
  // },
  // {
  //   id: "paeezan",
  //   name: "Paeezan",
  //   logo: "/assets/images/sponsors/paeezan.png",
  //   description: "Paeezan is a technology company that provides innovative solutions for the gaming industry. They focus on creating tools and platforms that enhance the gaming experience for both developers and players.",
  //   link: "https://paeezan.com",
  //   tier: "silver"
  // },
  // {
  //   id: "quizOfKings",
  //   name: "Quiz of Kings",
  //   logo: "/assets/images/sponsors/quizOfKings.png",
  //   description: "Quiz of Kings is an interactive gaming platform that combines entertainment with education. They create engaging quiz-based games that challenge players while providing a fun and competitive environment.",
  //   link: "https://quizofkings.com",
  //   tier: "silver"
  // }
];
