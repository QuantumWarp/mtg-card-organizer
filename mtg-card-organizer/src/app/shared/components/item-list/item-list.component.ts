import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'mco-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent {
  @Output() addClicked = new EventEmitter();
  @Output() deleteClicked = new EventEmitter<any>();
  @Output() itemClicked = new EventEmitter<any>();

  @Input() title: string;
  @Input() icon: string;

  @Input() data: { name: string }[];
}
