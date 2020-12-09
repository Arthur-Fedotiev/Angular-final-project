import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { IHero } from 'src/app/shared/interfaces/heroInterface';
import { HeroesService } from 'src/app/shared/services/heroes.service';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.css'],
})
export class HeroesListComponent implements OnInit {
  @Input() heroes: IHero[];
  @Output() heroSelect: EventEmitter<string> = new EventEmitter<string>();

  lastSelectedHero: IHero | null;

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    this.lastSelectedHero = this.heroesService.getLastSelectedHero();
  }

  selectHero = (hero: IHero): void => {
    this.heroSelect.emit(hero.id);
    this.heroesService.addToSelected(hero);
    this.lastSelectedHero = this.heroesService.getLastSelectedHero();
  };
}
