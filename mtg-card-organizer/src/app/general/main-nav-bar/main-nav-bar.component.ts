import { Component, OnInit } from '@angular/core';
import { MatToolbar, MatButton, MatIcon } from '@angular/material';

@Component({
  selector: 'main-nav-bar',
  templateUrl: './main-nav-bar.component.html',
  styleUrls: ['./main-nav-bar.component.css']
})
export class MainNavBarComponent implements OnInit {
  title = 'MTG Card Organizer';

  constructor() { }

  ngOnInit() {
  }

}
