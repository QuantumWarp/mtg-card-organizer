import { Component, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { Card } from '../models/card';
import { CardService } from '../services/card.service';
import { DataSource } from '@angular/cdk/table';
import { GridDataSource } from '../../general/grid/grid-data-source';
import { MatSort } from '@angular/material';

@Component({
  selector: 'app-card-search-grid',
  templateUrl: './card-search-grid.component.html'
})
export class CardSearchGridComponent {
  @Input() cardDataSource: GridDataSource<Card>;
  @ViewChild(MatSort) sort: MatSort;
  selectedCard: Card;
  displayedColumns = ['name'];
  @Output() selectedCardChange = new EventEmitter<Card>();

  detailsClick(card: Card): void {
    this.selectedCard = card;
    this.selectedCardChange.emit(this.selectedCard);
  }
}
