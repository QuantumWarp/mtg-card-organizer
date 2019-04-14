import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/internal/operators';

import { ContainerService } from '../../container/services/container.service';
import { UserModel } from '../models/user.model';
import { UserService } from '../services/user.service';
import { BasicGridComponent } from '../../shared/grid/basic-grid/basic-grid.component';
import { UserQuery } from '../models/user-query';
import { Paging } from '../../shared/filtering/paging';

@Component({
  selector: 'mco-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit {
  searchFormControl = new FormControl();

  userQuery = new UserQuery({
    paging: new Paging({ limit: 10 }),
  });

  displayedColumns = [ 'userName', 'bookmarkAction' ];

  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<UserSearchComponent>,
    public containerService: ContainerService,
    public userService: UserService) { }

  ngOnInit(): void {
    this.searchFormControl.valueChanges.pipe(
      debounceTime(500),
    ).subscribe(value => {
      this.userQuery = new UserQuery({
        paging: new Paging({ limit: 10 }),
        userName: value,
      });
    });
  }

  openContainer(user: UserModel): void {
    this.dialogRef.close();
    this.router.navigateByUrl(`containers/${user.baseContainerId}`);
  }

  bookmarkUserContainer(user: UserModel): void {
    this.containerService.toggleBookmark(user.baseContainerId).subscribe(() =>
      this.dialogRef.close()
    );
  }
}
