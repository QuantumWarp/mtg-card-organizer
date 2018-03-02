import { Component, trigger, state, style, transition, animate } from '@angular/core';

@Component({
  selector: 'app-standard-layout',
  templateUrl: './standard-layout.component.html',
  styleUrls: ['./standard-layout.component.scss'],
  animations: [
    trigger('navToggle', [
      state('0', style({})),
      state('1', style({left: '0px'})),
      transition('0 <=> 1', animate('100ms')),
    ])
  ]
})
export class StandardLayoutComponent {
}
