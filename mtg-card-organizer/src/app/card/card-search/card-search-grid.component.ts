import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material';

import { GridDataSource } from '../../shared/grid/grid-data-source';
import { Card } from '../models/card';
import { Set } from '../models/set';
import { SetService } from '../services/set.service';

@Component({
  selector: 'app-card-search-grid',
  templateUrl: './card-search-grid.component.html'
})
export class CardSearchGridComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;

  @Output() cardSelected = new EventEmitter<Card>();

  @Input() cardDataSource: GridDataSource<Card>;
  @Input() sets: Set[];
  @Input() displayedColumns = ['name', 'setSymbol', 'manaCost'];

  constructor(private setService: SetService) { }

  ngOnInit(): void {
    if (!this.sets) {
      this.setService.query().subscribe(results => this.sets = results.data);
    }
  }
}
