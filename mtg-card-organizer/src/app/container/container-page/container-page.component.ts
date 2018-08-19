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
import { ContainerImportComponent } from '../container-import/container-import.component';
import { ContainerExportComponent } from '../container-export/container-export.component';

@Component({
  selector: 'app-container-page',
  templateUrl: './container-page.component.html',
  styleUrls: ['./container-page.component.scss']
})
export class ContainerPageComponent implements OnInit {
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
    const dialogRef = this.dialog.open(ContainerImportComponent);
    dialogRef.componentInstance.container = this.container;
  }

  openExport(): void {
    const dialogRef = this.dialog.open(ContainerExportComponent);
    dialogRef.componentInstance.container = this.container;
  }
}
