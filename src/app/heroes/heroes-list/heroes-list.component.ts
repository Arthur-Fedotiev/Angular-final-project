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

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    console.log(this.heroesService.getSelectedHeroes());
    this.selectedHeroes = this.heroesService.getSelectedHeroes();
  }

  selectHero(hero: HeroInterface): void {
    this.heroSelect.emit(hero.id);
    this.heroesService.addToSelected(hero);
  }
}
