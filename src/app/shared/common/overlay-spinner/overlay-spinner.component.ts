import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-overlay-spinner',
  templateUrl: './overlay-spinner.component.html',
  styleUrls: ['./overlay-spinner.component.css'],
})
export class OverlaySpinnerComponent {
  @Input() value: number = 100;
  @Input() diameter: number = 100;
  @Input() mode: string = 'indeterminate';
  @Input() strokeWidth: number = 10;
  @Input() overlay: boolean = false;
  @Input() color: string = 'primary';
}
