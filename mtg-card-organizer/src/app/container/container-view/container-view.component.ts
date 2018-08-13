import { ChangeDetectorRef, Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../../authentication/services/authentication.service';
import { AddCollectionModalComponent } from '../add-modals/add-collection-modal.component';
import { AddContainerModalComponent } from '../add-modals/add-container-modal.component';
import { AddDeckModalComponent } from '../add-modals/add-deck-modal.component';
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
    private dialog: MatDialog,
    public authService: AuthenticationService,
    private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.container = this.route.snapshot.data['container'];
      this.changeDetector.detectChanges();
    });
  }

  createContainer(): void {
    this.dialog.open(AddContainerModalComponent, { data: this.container });
  }

  createCollection(): void {
    this.dialog.open(AddCollectionModalComponent, { data: this.container });
  }

  createDeck(): void {
    this.dialog.open(AddDeckModalComponent, { data: this.container });
  }

  openImport(): void {
    // const dialogRef = this.dialog.open(CollectionImportComponent);
    // dialogRef.componentInstance.collection = this.collection;
    // dialogRef.afterClosed().subscribe(success => success ? this.refreshSubCollections() : null);
  }
}
