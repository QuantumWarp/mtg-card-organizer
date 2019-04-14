import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

import { navModel } from './nav-model';
import { NavNode } from './nav-node';

@Component({
  selector: 'mco-navigator',
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

  actionClicked(actionedNode: NavNode): void {
    const allNodes = this.allNodeList();
    const actionedNodeChain = this.actionedNodeChain(actionedNode, allNodes);
    const openNodes = allNodes.filter(x => !actionedNodeChain.includes(x) && x.open);
    openNodes.forEach(x => x.open = false);
  }

  actionedNodeChain(actionedNode: NavNode, allNodes: NavNode[]): NavNode[] {
    const list = new Array<NavNode>();
    list.push(actionedNode);
    let parentNode = actionedNode;
    while (parentNode) {
      parentNode = allNodes.find(x => x.children && x.children.includes(parentNode));
      list.push(parentNode);
    }
    return list;
  }

  allNodeList(): NavNode[] {
    const list = new Array<NavNode>();
    navModel.forEach(node => {
      list.push(...this.nestedNodes(node));
    });
    return list;
  }

  private nestedNodes(navNode: NavNode): NavNode[] {
    const list = new Array<NavNode>();
    list.push(navNode);
    if (navNode.children) {
      navNode.children.forEach(childNode => {
        list.push(...this.nestedNodes(childNode));
      });
    }
    return list;
  }
}
