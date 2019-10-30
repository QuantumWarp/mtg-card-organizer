import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { Container } from '../../container/models/container';
import { ContainerService } from '../../container/services/container.service';
import { SnackNotificationService } from '../../core/notifications/snack-notification.service';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogData } from '../../shared/components/confirm-dialog/confirm-dialog.data';
import { UserSearchComponent } from '../user-search/user-search.component';

@Component({
  selector: 'mco-bookmarked-container-list',
  templateUrl: './bookmarked-container-list.component.html',
  styleUrls: ['./bookmarked-container-list.component.scss']
})
export class BookmarkedContainerListComponent {
  @Output() bookmarksUpdated = new EventEmitter();

  @Input() containers: Container[];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private snackNotificationService: SnackNotificationService,
    private containerService: ContainerService,
  ) { }

  viewContainer(container: Container): void {
    this.router.navigateByUrl('/containers/' + container.id);
  }

  findBookmark(): void {
    this.dialog.open(UserSearchComponent).afterClosed()
      .subscribe((success) => success && this.bookmarksUpdated.emit());
  }

  removeBookmark(container: Container): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: <ConfirmDialogData> {
        title: 'Remove Bookmark',
        description: `Are you sure you want to remove bookmark for '${container.name}'`,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) { return; }

      this.containerService.toggleBookmark(container.id).subscribe(() => {
        this.snackNotificationService.notifySuccess('Removed Bookmark');
        this.bookmarksUpdated.emit();
      });
    });
  }
}
