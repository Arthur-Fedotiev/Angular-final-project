import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { HeroInterface } from 'src/app/shared/interfaces/heroInterface';
import { HeroesService } from 'src/app/shared/services/heroes.service';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.css'],
})
export class HeroesListComponent implements OnInit {
  @Input() heroes: HeroInterface[];
  @Output() heroSelect = new EventEmitter();

  selectedHeroes: HeroInterface[];
  lastSelectedHero: HeroInterface | null;

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    this.selectedHeroes = this.heroesService.getSelectedHeroes();
    this.lastSelectedHero = this.heroesService.getLastSelectedHero();
  }

  selectHero(hero: HeroInterface): void {
    this.heroSelect.emit(hero.id);
    this.heroesService.addToSelected(hero);
  }
}
