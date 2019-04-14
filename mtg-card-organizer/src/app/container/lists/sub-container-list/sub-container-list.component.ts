import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { SnackNotificationService } from '../../../core/notifications/snack-notification.service';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogData } from '../../../shared/components/confirm-dialog/confirm-dialog.data';
import { AddContainerModalComponent } from '../../add-modals/container/add-container-modal.component';
import { Container } from '../../models/container';
import { ContainerService } from '../../services/container.service';

@Component({
  selector: 'mco-sub-container-list',
  templateUrl: './sub-container-list.component.html',
  styleUrls: ['./sub-container-list.component.scss']
})
export class SubContainerListComponent {
  @Output() containersUpdated = new EventEmitter();

  @Input() container: Container;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private snackNotificationService: SnackNotificationService,
    private containerService: ContainerService,
  ) { }

  viewSubContainer(container: Container): void {
    this.router.navigateByUrl('/containers/' + container.id);
  }

  createSubContainer(): void {
    const dialogRef = this.dialog.open(AddContainerModalComponent, {
      data: this.container,
    });
    dialogRef.afterClosed().subscribe((success) => success && this.containersUpdated.emit());
  }

  deleteSubContainer(container: Container): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: <ConfirmDialogData> {
        title: 'Delete Container',
        description: `Are you sure you want to delete '${container.name}'`,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) { return; }

      this.containerService.delete(container.id).subscribe(() => {
        this.snackNotificationService.notifySuccess(`'${container.name}' Deleted`);
        this.containersUpdated.emit();
      });
    });
  }
}
