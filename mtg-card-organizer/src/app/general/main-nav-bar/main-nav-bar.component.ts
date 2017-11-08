import { Component, Output, EventEmitter } from '@angular/core';
import { MatToolbar, MatButton, MatIcon } from '@angular/material';

@Component({
  selector: 'main-nav-bar',
  templateUrl: './main-nav-bar.component.html',
  styleUrls: ['./main-nav-bar.component.css']
})
export class MainNavBarComponent {
  title = 'MTG Card Organizer';
  @Output() listToggleClick = new EventEmitter();

  toggleNav(): void {
    this.listToggleClick.emit();
  }
}
