import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-battle-modal',
  templateUrl: './battle-modal.component.html',
  styleUrls: ['./battle-modal.component.css'],
})
export class BattleModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { result: string }) {}
}
