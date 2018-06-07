import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.scss']
})
export class LoadingComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public message: string) {}
}
