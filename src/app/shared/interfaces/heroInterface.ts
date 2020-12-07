export interface HeroInterface {
  id: string;
  name: string;
  powerstats: Stats;
  url: string;
  selected: boolean;
}

export interface Stats {
  intelligence: string;
  strength: string;
  speed: string;
  durability: string;
  power: string;
  combat: string;
}

export interface HeroAPIResponse {
  heroes: HeroInterface[];
}

export interface HeroSearch {
  heroName: string;
}
