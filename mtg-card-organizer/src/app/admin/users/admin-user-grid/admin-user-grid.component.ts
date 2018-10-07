import { Component, Input, ViewChild } from '@angular/core';

import { AbstractGridComponent } from '../../../shared/grid/abstract-grid.component.html';
import { BasicGridComponent } from '../../../shared/grid/basic-grid/basic-grid.component';
import { AdminUserService } from '../../services/admin-user.service';
import { AdminUserModel } from '../admin-user.model';

@Component({
  selector: 'app-admin-user-grid',
  templateUrl: './admin-user-grid.component.html',
  styleUrls: ['./admin-user-grid.component.scss']
})
export class AdminUserGridComponent extends AbstractGridComponent {
  @ViewChild(BasicGridComponent) basicGrid: BasicGridComponent<AdminUserModel>;

  // @Input() filter = new CardQuery();
  @Input() displayedColumns = ['userName', 'email', 'suspended', 'createdDate', 'suspendAction'];

  constructor(public adminUserService: AdminUserService) {
    super();
  }

  suspendAction(user: AdminUserModel): void {
    this.adminUserService.toggleUserSuspension(user.id)
      .subscribe(() => this.basicGrid.dataSource.refresh());
  }
}
