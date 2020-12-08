import { Component, OnInit } from '@angular/core';
import { HeroInterface } from 'src/app/shared/interfaces/heroInterface';
import { HeroesService } from 'src/app/shared/services/heroes.service';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.css'],
})
export class HeroesListComponent implements OnInit {
  heroes: HeroInterface[];
  lastSelectedHero: HeroInterface | null;

  constructor(private heroService: HeroesService) {}

  ngOnInit(): void {
    this.heroes = this.heroService.getSelectedHeroes();
    this.lastSelectedHero = this.heroService.getLastSelectedHero();
    console.log(this.heroService.getLastSelectedHero());
  }

  removeFromSelected(id: string): void {
    this.heroService.removeFromSelected(id);
    this.lastSelectedHero = this.heroService.getLastSelectedHero();
  }
}
