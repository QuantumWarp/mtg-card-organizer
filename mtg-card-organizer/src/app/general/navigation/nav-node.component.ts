import { Component, Input } from '@angular/core';

import { NavNode } from './nav-node';
import { navModel } from './nav-model';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-nav-node',
  templateUrl: './nav-node.component.html',
  styleUrls: ['./navigation.scss'],
  animations: [
    trigger('arrowDown', [
      state('0', style({})),
      state('1', style({transform: 'rotate(90deg)'})),
      transition('0 <=> 1', animate('100ms')),
    ]),
    trigger('slideOpen', [
      state('0', style({height: '0px'})),
      state('1', style({})),
      transition('0 <=> 1', animate('100ms')),
    ])
  ]
})
export class NavNodeComponent {
  @Input() navNode: NavNode;
  @Input() nestedIndex: number;
  open = false;

  get hasChildren(): boolean {
    return this.navNode.children && this.navNode.children.length > 0;
  }

  constructor(private router: Router) { }

  nodeClicked(): void {
    if (this.navNode.children && this.navNode.children.length !== 0) {
      this.open = !this.open;
    }
    if (this.navNode.action) {
      this.navNode.action();
    }
    if (this.navNode.routerLink) {
      this.router.navigateByUrl(this.navNode.routerLink);
    }
  }
}
