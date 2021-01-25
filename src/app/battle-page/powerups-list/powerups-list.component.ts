import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IPowerUp } from 'src/app/shared/interfaces/userDataInterfaces';

@Component({
  selector: 'app-powerups-list',
  templateUrl: './powerups-list.component.html',
  styleUrls: ['./powerups-list.component.css'],
})
export class PowerupsListComponent implements OnInit {
  @Input() availablePowerUps: IPowerUp[];
  @Output() enhance: EventEmitter<IPowerUp> = new EventEmitter<IPowerUp>();
  constructor() {}

  ngOnInit(): void {}

  usePowerUp(powerUp: IPowerUp) {
    this.enhance.emit(powerUp);
  }
}
