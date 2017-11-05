import { Component, Input } from '@angular/core';
import { MatSidenavContainer } from '@angular/material';
import { Card } from '../cards/card';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Input() card: Card;
}
