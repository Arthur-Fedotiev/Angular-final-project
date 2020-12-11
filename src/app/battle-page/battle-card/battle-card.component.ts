import { Component, Input, OnInit } from '@angular/core';
import { IHero, IHeroDetails } from 'src/app/shared/interfaces/heroInterface';
import { IPowerUp } from 'src/app/shared/interfaces/userDataInterfaces';

@Component({
  selector: 'app-battle-card',
  templateUrl: './battle-card.component.html',
  styleUrls: ['./battle-card.component.css'],
})
export class BattleCardComponent implements OnInit {
  @Input() hero: IHero | IHeroDetails;
  @Input() appliedPowerUps: IPowerUp[];
  constructor() {}

  ngOnInit(): void {}
}
