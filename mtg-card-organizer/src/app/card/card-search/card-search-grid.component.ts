import { Component, Output, EventEmitter, Input, ViewChild, OnInit } from '@angular/core';
import { Card } from '../models/card';
import { Set } from '../models/set';
import { CardService } from '../services/card.service';
import { DataSource } from '@angular/cdk/table';
import { GridDataSource } from '../../general/grid/grid-data-source';
import { MatSort } from '@angular/material';
import { SetService } from '../services/set.service';

@Component({
  selector: 'app-card-search-grid',
  templateUrl: './card-search-grid.component.html'
})
export class CardSearchGridComponent implements OnInit {
  @Input() cardDataSource: GridDataSource<Card>;
  @Input() sets: Set[];
  @ViewChild(MatSort) sort: MatSort;
  selectedCard: Card;
  displayedColumns = ['name', 'setSymbol', 'manaCost'];
  @Output() selectedCardChange = new EventEmitter<Card>();

  constructor(private setService: SetService) { }

  detailsClick(card: Card): void {
    this.selectedCard = card;
    this.selectedCardChange.emit(this.selectedCard);
  }

  ngOnInit(): void {
    if (!this.sets) {
      this.setService.query().subscribe(results => this.sets = results.data);
    }
  }
}
