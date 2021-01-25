import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-powerstats',
  templateUrl: './powerstats.component.html',
  styleUrls: ['./powerstats.component.css'],
})
export class PowerstatsComponent {
  @Input() powerstats: { [key: string]: string };
  @Input() enhanced: string[];

  isEnhanced(key: string): boolean {
    return !!this.enhanced && this.enhanced.includes(key);
  }
}
