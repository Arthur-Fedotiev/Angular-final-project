export interface IHero {
  id: string;
  name: string;
  powerstats: IStats;
  url: string;
  selected: boolean;
}

export interface IStats {
  intelligence: string;
  strength: string;
  speed: string;
  durability: string;
  power: string;
  combat: string;
}

export interface IHeroAPIResponse {
  heroes: IHero[];
}

export interface HeroSearch {
  heroName: string;
}

export interface IAPIResults {
  id: string;
  name: string;
  powerstats: IStats;
  image: { [key: string]: string };
  selected: boolean;
}
