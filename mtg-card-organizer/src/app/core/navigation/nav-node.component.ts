import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';

import { NavNode } from './nav-node';
import { navModel } from './nav-model';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AuthenticationService } from '../../authentication/services/authentication.service';

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
export class NavNodeComponent implements OnInit {
  @Output() nodeActionEvent = new EventEmitter<NavNode>();
  @Input() navNode: NavNode;
  @Input() nestedIndex: number;

  get hasChildren(): boolean {
    return this.navNode.children && this.navNode.children.length > 0;
  }

  get showNode(): boolean {
    if (!this.navNode.requiredRole) { return true; }
    return this.authenticationService.roles.includes(this.navNode.requiredRole);
  }

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.navNode.open = false;
  }

  nodeClicked(): void {
    if (this.navNode.children && this.navNode.children.length !== 0) {
      this.navNode.open = !this.navNode.open;
    }
    if (this.navNode.action) {
      this.navNode.action();
      this.nodeActionEvent.emit(this.navNode);
    }
    if (this.navNode.routerLink) {
      this.router.navigateByUrl(this.navNode.routerLink);
      this.nodeActionEvent.emit(this.navNode);
    }
  }
}
