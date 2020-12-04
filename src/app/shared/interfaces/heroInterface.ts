export interface HeroInterface {
  id: string;
  name: string;
  powerstats: Stats;
  url: string;
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
