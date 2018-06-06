import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable, of, Subscription } from 'rxjs';
import { delay } from 'rxjs/internal/operators';

import { LoadingComponent } from './loading.component';

// TODO: check for any race condition problems
@Injectable()
export class LoadingService {
  delayTime = 500;
  minTime = 1000;
  message: string;

  private delaySub: Subscription;
  private dialogRef: MatDialogRef<LoadingComponent>;
  private promiseArray = new Array<Promise<any>>();

  constructor(private dialog: MatDialog) {}

  load(message: string, promise: Promise<any>): void {
    this.message = message;
    this.conditionalSetupDelay(promise);
    this.promiseBegin(promise);
  }

  private conditionalSetupDelay(promise: Promise<any>) {
    if (this.promiseArray.length === 0) {
      const delayObs = of(0).pipe(delay(this.delayTime));
      this.delaySub = delayObs.subscribe(() => this.openDialog(promise));
    }
  }

  private promiseBegin(promise: Promise<any>): void {
    this.promiseArray.push(promise);
    promise.then(() => this.promiseComplete(promise)).catch(() => this.promiseComplete(promise));
  }

  private promiseComplete(completedPromise: Promise<any>): void {
    const index = this.promiseArray.indexOf(completedPromise);
    this.promiseArray.splice(index, 1);
    if (this.promiseArray.length === 0) {
      this.delaySub.unsubscribe();
      if (this.dialogRef) {
        this.dialogRef.close();
      }
    }
  }

  private openDialog(ongoingPromise: Promise<any>): void {
    const minTimePromise = of(0).pipe(delay(this.minTime)).toPromise();
    this.promiseBegin(minTimePromise);
    this.dialogRef = this.dialog.open(LoadingComponent, {
      maxWidth: '300px', width: '300px',
      maxHeight: '60px', height: '60px',
      disableClose: true,
      data: this.message,
    });
  }
}
