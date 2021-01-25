export interface IHero {
  id: string;
  name: string;
  powerstats: IStats;
  url: string;
  selected: boolean;
}

export interface IHeroDetails {
  id: string;
  name: string;
  powerstats: IStats;
  url: string;
  fullName: string;
  firstAppeared: string;
  gender: string;
  height: string;
  race: string;
  belongesTo: string;
  relatives: string;
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

export interface ISingleHeroAPIResponse {
  response: string;
  id: string;
  name: string;
  powerstats: IStats;
  image: IObjectWithOnlyStrings;
  biography: IBiography;
  appearance: IAppearance;
  connections: IObjectWithOnlyStrings;
  work: IObjectWithOnlyStrings;
}

export interface IBiography {
  ['full-name']: string;
  ['alter-egos']: string;
  ['place-of-birth']: string;
  ['first-appearance']: string;
  aliases: string[];
  publisher: string;
  alignment: string;
}

export interface IAppearance {
  gender: string;
  race: string;
  height: string[];
  weight: string[];
  ['eye-color']: string;
  ['hair-color']: string;
}

export interface IObjectWithOnlyStrings {
  [key: string]: string;
}
