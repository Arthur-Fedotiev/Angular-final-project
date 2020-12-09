import { Component, OnInit } from '@angular/core';
import { IPowerUp } from 'src/app/shared/interfaces/userDataInterfaces';
import { UserRecordsService } from 'src/app/shared/services/user-records.service';

@Component({
  selector: 'app-powerups',
  templateUrl: './powerups.component.html',
  styleUrls: ['./powerups.component.css'],
})
export class PowerupsComponent implements OnInit {
  powerUps: IPowerUp[];

  constructor(private userRecordsService: UserRecordsService) {}

  ngOnInit(): void {
    this.powerUps = this.userRecordsService.getPowerUps();
  }
}
