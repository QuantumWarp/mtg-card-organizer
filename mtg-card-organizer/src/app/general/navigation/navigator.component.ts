import { Component } from '@angular/core';
import { NavModel } from './nav-model';
import { Router } from '@angular/router';
import { NavNode } from './nav-node';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigation.css']
})
export class NavigatorComponent {
  model = NavModel.default();

  constructor(private router: Router) { }

  navigate(node: NavNode) {
    this.router.navigate([node.link]);
  }
}
