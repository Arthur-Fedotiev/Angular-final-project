import { IAPIResults, IHero, IStats } from '../interfaces/heroInterface';
import randomNumber from '../utils/randomNumber';

export class BaseHeroClass implements IHero {
  _id: string;
  _name: string;
  _powerstats: IStats;
  _url: string;
  public selected: boolean;

  constructor(heroAPIResponse: IAPIResults) {
    this.initHero(heroAPIResponse);
  }

  private initHero(heroAPIResponse: IAPIResults) {
    this._id = heroAPIResponse.id;
    this._name = heroAPIResponse.name;
    this.setPowerstats = heroAPIResponse.powerstats;
    this._url = heroAPIResponse.image.url;
    this.selected = false;
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name || 'Nameless warior';
  }

  public get powerstats(): IStats {
    return this._powerstats;
  }

  public get url(): string {
    return this._url;
  }

  private set setPowerstats(powerStats: IStats) {
    Object.keys(powerStats).map((stat) => {
      if (powerStats[stat] === 'null') {
        powerStats[stat] = randomNumber(1, 100).toString();
      }
    });
    this._powerstats = powerStats;
  }
}
