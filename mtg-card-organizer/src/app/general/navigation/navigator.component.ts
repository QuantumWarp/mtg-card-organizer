import { Component } from '@angular/core';

import { navModel } from './nav-model';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigation.scss']
})
export class NavigatorComponent {
  open = false;
  navModel = navModel;
}
