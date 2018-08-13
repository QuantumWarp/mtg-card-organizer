import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Container } from '../models/container';

@Component({
  selector: 'app-sub-container-list',
  templateUrl: './sub-container-list.component.html',
  styleUrls: ['./sub-container-list.component.scss']
})
export class SubContainerListComponent {
  @Input() container: Container[];

  constructor(private router: Router) { }

  itemSelected(container: Container): void {
    this.router.navigateByUrl('/containers/' + container.id);
  }
}
