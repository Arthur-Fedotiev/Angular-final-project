import { Component, Input, OnInit } from '@angular/core';
import { HeroInterface } from 'src/app/shared/interfaces/heroInterface';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.css'],
})
export class HeroesListComponent implements OnInit {
  @Input() heroes: Array<HeroInterface>;

  constructor() {}

  ngOnInit(): void {}
}
