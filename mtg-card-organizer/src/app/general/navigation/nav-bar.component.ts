import { Component, Output, EventEmitter } from '@angular/core';
import { MatToolbar, MatButton, MatIcon } from '@angular/material';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
})
export class NavBarComponent {
  title = 'MTG Card Organizer';
  @Output() listToggleClick = new EventEmitter();

  toggleNav(): void {
    this.listToggleClick.emit();
  }
}
