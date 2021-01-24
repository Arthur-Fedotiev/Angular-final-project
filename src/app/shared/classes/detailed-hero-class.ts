import {
  IAPIResults,
  IAppearance,
  IBiography,
  IObjectWithOnlyStrings,
  ISingleHeroAPIResponse,
} from '../interfaces/heroInterface';
import { BaseHeroClass } from './base-hero-class';

export class DetailedHeroClass extends BaseHeroClass {
  _biography: IBiography;
  _appearance: IAppearance;
  _connections: IObjectWithOnlyStrings;
  _work: IObjectWithOnlyStrings;

  constructor(apiResponse: ISingleHeroAPIResponse) {
    super(apiResponse);
    this.initData(apiResponse);
  }

  private initData(apiResponse: ISingleHeroAPIResponse) {
    this._biography = apiResponse.biography;
    this._appearance = apiResponse.appearance;
    this._connections = apiResponse.connections;
    this._work = apiResponse.work;
  }

  get fullName() {
    return this._biography['full-name'];
  }
  public get firstAppeared() {
    return this._biography['first-appearance'];
  }
  public get gender() {
    return this._appearance.gender;
  }
  public get height() {
    return this._appearance.height[1];
  }
  public get race() {
    return this._appearance.race;
  }
  public get belongesTo() {
    return this._connections['group-affiliation'];
  }
  public get relatives() {
    return this._connections.relatives;
  }
}
