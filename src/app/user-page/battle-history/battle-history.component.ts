import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

const ELEMENT_DATA = [
  {
    date: Date.now(),
    heroName: 10,
    opponentName: 'Superman',
    result: 'defeat',
  },
  {
    date: Date.now(),
    heroName: 5,
    opponentName: 'Superman',
    result: 'defeat',
  },
  {
    date: Date.now(),
    heroName: 'Batdfdfman',
    opponentName: 'Superman',
    result: 'defeat',
  },
  {
    date: Date.now(),
    heroName: 'uuu',
    opponentName: 'Superman',
    result: 'defeat',
  },
  {
    date: Date.now(),
    heroName: 'aa',
    opponentName: 'Superman',
    result: 'defeat',
  },
  {
    date: Date.now(),
    heroName: 'Batman',
    opponentName: 'Superman',
    result: 'defeat',
  },
  {
    date: Date.now(),
    heroName: 'lol',
    opponentName: 'Superman',
    result: 'defeat',
  },
  {
    date: Date.now(),
    heroName: 'sdsd',
    opponentName: 'Superman',
    result: 'defeat',
  },
  {
    date: Date.now(),
    heroName: 1,
    opponentName: 'Superman',
    result: 'defeat',
  },
];

@Component({
  selector: 'app-battle-history',
  templateUrl: './battle-history.component.html',
  styleUrls: ['./battle-history.component.css'],
})
export class BattleHistoryComponent implements OnInit {
  displayedColumns: string[] = ['date', 'heroName', 'opponentName', 'result'];
  dataSource: MatTableDataSource<object>;

  @ViewChild(MatSort) sort: MatSort;

  constructor() {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
