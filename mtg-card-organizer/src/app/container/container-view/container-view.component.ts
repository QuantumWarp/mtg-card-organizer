import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from '../../authentication/services/authentication.service';
import { CardRapidEntryComponent } from '../../card/card-rapid-entry/card-rapid-entry.component';
import { CardInstance } from '../../card/models/card-instance';
import { LoadingService } from '../../core/loading/loading.service';
import { SnackNotificationService } from '../../core/notifications/snack-notification.service';
import { SnackNotificationType } from '../../core/notifications/snack-notification.type';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogData } from '../../shared/components/confirm-dialog/confirm-dialog.data';
import { PageSortFilter } from '../../shared/filtering/page-sort-filter';
import { PropertyFilter } from '../../shared/filtering/property-filter';
import { PropertyFilterOperator } from '../../shared/filtering/property-filter-operator';
import { Container } from '../models/container';
import { ContainerService } from '../services/container.service';

@Component({
  selector: 'app-container-view',
  templateUrl: './container-view.component.html',
  styleUrls: ['./container-view.component.scss']
})
export class ContainerViewComponent implements OnInit {
  container: Container;

  constructor(
    public containerService: ContainerService,
    private route: ActivatedRoute,

    public authService: AuthenticationService,
    private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.container = this.route.snapshot.data['container'];
      this.changeDetector.detectChanges();
    });
  }

  createContainer(): void {

  }

  createCollection(): void {

  }

  createDeck(): void {

  }
}
