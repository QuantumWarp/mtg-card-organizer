import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { CardService } from '../services/card.service';
import { GridDataSource } from '../../general/grid/grid-data-source';
import { Card } from '../models/card';
import { MatSort, MatPaginator } from '@angular/material';
import { CardSearchGridComponent } from './card-search-grid.component';
import { Filterer } from '../../general/grid/filterer';

@Component({
  selector: 'app-card-search',
  templateUrl: './card-search.component.html'
})
export class CardSearchComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('searchGrid') searchGrid: CardSearchGridComponent;
  @Output() selectedCardChange = new EventEmitter<Card>();
  filterer = new Filterer();
  cardDataSource: GridDataSource<Card>;

  constructor(private cardService: CardService) { }

  ngOnInit(): void {
    this.cardDataSource = new GridDataSource<Card>(this.cardService, this.paginator, this.searchGrid.sort, this.filterer);
  }
}
