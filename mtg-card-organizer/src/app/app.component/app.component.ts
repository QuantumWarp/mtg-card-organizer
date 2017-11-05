import { Component, Input } from '@angular/core';
import { Card } from '../cards/card';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MTG Card Organizer';
  @Input() card: Card;
}
