import { ChangeDetectorRef, Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../../authentication/services/authentication.service';
import { ContainerExportComponent } from '../import-export/export/container-export.component';
import { ContainerImportComponent } from '../import-export/import/container-import.component';
import { Container } from '../models/container';
import { Permission } from '../models/permission';
import { ContainerPermissionsComponent } from '../permissions/container-permissions.component';
import { ContainerService } from '../services/container.service';

@Component({
  selector: 'mco-container-page',
  templateUrl: './container-page.component.html',
  styleUrls: ['./container-page.component.scss'],
})
export class ContainerPageComponent implements OnInit {
  container: Container;
  permissions = Permission;

  constructor(
    public authService: AuthenticationService,
    public containerService: ContainerService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private changeDetector: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(() => {
      this.container = this.route.snapshot.data['container'];
      this.changeDetector.detectChanges();
    });
  }

  refresh(): void {
    this.containerService.get(this.container.id).subscribe(result => {
      this.container = result;
    });
  }

  openPermissions(): void {
    this.dialog.open(ContainerPermissionsComponent, { data: this.container, width: '600px' });
  }

  openImport(): void {
    const dialogRef = this.dialog.open(ContainerImportComponent, { data: this.container });
    dialogRef.afterClosed().subscribe(() => this.refresh());
  }

  openExport(): void {
    this.dialog.open(ContainerExportComponent, { data: this.container });
  }

  toggleBookmark(): void {
    this.containerService.toggleBookmark(this.container.id)
      .subscribe(() => this.container.isBookmarked = !this.container.isBookmarked);
  }
}
