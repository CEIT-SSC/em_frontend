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
    id: "cafe-bazaar",
    name: "Cafe Bazaar",
    logo: "/assets/images/sponsors/cafeBazaar.png",
    description: "Cafe Bazaar is Iran's largest Android app marketplace, providing a platform for mobile applications and games. They support the gaming community by sponsoring events and promoting innovative mobile gaming solutions.",
    link: "https://cafebazaar.ir",
    tier: "platinum"
  },
  {
    id: "dropout",
    name: "Dropout",
    logo: "/assets/images/sponsors/dropout.png",
    description: "Dropout is a creative gaming studio focused on developing innovative and engaging games. They are passionate about supporting the gaming community and fostering creativity in game development.",
    link: "https://dropout.games",
    tier: "gold"
  },
  {
    id: "incytel-games",
    name: "Incytel Games",
    logo: "/assets/images/sponsors/incytelGames.png",
    description: "Incytel Games is a leading game development company specializing in mobile and web-based games. They are committed to advancing the gaming industry through cutting-edge technology and creative gameplay.",
    link: "https://incytelgames.com",
    tier: "gold"
  },
  {
    id: "paeezan",
    name: "Paeezan",
    logo: "/assets/images/sponsors/paeezan.png",
    description: "Paeezan is a technology company that provides innovative solutions for the gaming industry. They focus on creating tools and platforms that enhance the gaming experience for both developers and players.",
    link: "https://paeezan.com",
    tier: "silver"
  },
  {
    id: "quiz-of-kings",
    name: "Quiz of Kings",
    logo: "/assets/images/sponsors/quizOfKings.png",
    description: "Quiz of Kings is an interactive gaming platform that combines entertainment with education. They create engaging quiz-based games that challenge players while providing a fun and competitive environment.",
    link: "https://quizofkings.com",
    tier: "silver"
  }
];
