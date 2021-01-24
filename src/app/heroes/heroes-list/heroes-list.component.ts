import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { BaseHeroClass } from 'src/app/shared/classes/base-hero-class';
import { IHero } from 'src/app/shared/interfaces/heroInterface';
import { HeroesService } from 'src/app/shared/services/heroes.service';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.css'],
})
export class HeroesListComponent implements OnInit {
  @Input() heroes: BaseHeroClass[];
  @Output() heroSelect: EventEmitter<string> = new EventEmitter<string>();

  lastSelectedHero: BaseHeroClass | null;

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    this.lastSelectedHero = this.heroesService.getLastSelectedHero();
  }

  selectHero = (hero: BaseHeroClass): void => {
    this.heroSelect.emit(hero.id);
    this.heroesService.addToSelected(hero);
    this.lastSelectedHero = this.heroesService.getLastSelectedHero();
  };
}
