import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../shared/services/heroes.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent implements OnInit {
  showList: boolean;

  constructor(private heroesService: HeroesService) {}

  ngOnInit() {
    this.showList = !!this.heroesService.getSelectedHeroes().length;
  }
}
