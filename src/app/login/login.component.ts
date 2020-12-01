import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLogging: boolean = true;
  constructor() {}

  ngOnInit(): void {}

  onToggleForm(val: boolean) {
    this.isLogging = val;
  }
}
