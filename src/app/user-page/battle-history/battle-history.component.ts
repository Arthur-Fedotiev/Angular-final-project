import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { UserRecordsService } from 'src/app/shared/services/user-records.service';

@Component({
  selector: 'app-battle-history',
  templateUrl: './battle-history.component.html',
  styleUrls: ['./battle-history.component.css'],
})
export class BattleHistoryComponent implements OnInit {
  displayedColumns: string[] = ['date', 'heroName', 'opponentName', 'result'];
  dataSource: MatTableDataSource<object>;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private userRecordsService: UserRecordsService) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource(
      this.userRecordsService.getBattleHistory()
    );
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
