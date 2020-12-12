import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IHero, IStats } from '../../interfaces/heroInterface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.css'],
})
export class HeroCardComponent {
  @Input() hero: IHero;
  @Input() clickHandler: (hero: IHero) => void;
  @Input() clickActionTitle: string;
  @Input() list: string;
  @Output()
  setNewLastSelectedHero: EventEmitter<IHero> = new EventEmitter<IHero>();

  @Input() lastSelectedHero: IHero | null;

  constructor(private heroService: HeroesService) {}

  getPowerStats(powerIStats: IStats): Array<[string, string]> {
    return HeroesService.getIStats(powerIStats);
  }

  isHeroSelected(id: string): boolean {
    return this.lastSelectedHero && this.lastSelectedHero.id === id;
  }

  showDisabled(hero: IHero): boolean {
    return this.clickActionTitle === 'SELECT' && hero.selected;
  }

  isLastSelected(id: string): boolean {
    return this.heroService.lastSelectedHero.id === id;
  }

  reselectHero(reselectedHero: IHero): void {
    this.setNewLastSelectedHero.emit(reselectedHero);
  }
}
