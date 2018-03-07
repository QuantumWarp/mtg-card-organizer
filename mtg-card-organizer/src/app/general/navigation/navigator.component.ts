import { Component, style, state, trigger, transition, animate } from '@angular/core';

import { navModel } from './nav-model';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigation.scss'],  
  animations: [
    trigger('navToggle', [
      state('0', style({})),
      state('1', style({width: '200px'})),
      transition('0 <=> 1', animate('100ms')),
    ])
  ]
})
export class NavigatorComponent {
  open = false;
  navModel = navModel;
}
