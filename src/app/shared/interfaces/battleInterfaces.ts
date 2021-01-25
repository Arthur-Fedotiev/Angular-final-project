import { IHero, IHeroDetails } from './heroInterface';

export interface IResultsOfBattle {
  userHero: IHero;
  opponentHero: IHeroDetails;
  result: string;
}

export interface IModalConfig {
  width: string;
  data: { result: string };
}
