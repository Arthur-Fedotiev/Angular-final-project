import { Component, Input, OnInit } from '@angular/core';
import { IStats } from '../../interfaces/heroInterface';

@Component({
  selector: 'app-powerstats',
  templateUrl: './powerstats.component.html',
  styleUrls: ['./powerstats.component.css'],
})
export class PowerstatsComponent {
  @Input() powerstats: { [key: string]: string };
}
