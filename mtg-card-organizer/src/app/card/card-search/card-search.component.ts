import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';

import { Filterer } from '../../shared/filtering/filterer';
import { GridDataSource } from '../../shared/grid/grid-data-source';
import { Card } from '../models/card';
import { CardService } from '../services/card.service';
import { CardSearchGridComponent } from './card-search-grid.component';

@Component({
  selector: 'app-card-search',
  templateUrl: './card-search.component.html',
  styleUrls: ['../card.scss']
})
export class CardSearchComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('searchGrid') searchGrid: CardSearchGridComponent;

  @Output() cardSelected = new EventEmitter<Card>();

  @Input() displayedColumns = ['name', 'setSymbol', 'manaCost'];
  @Input() cardService: CardService;

  filterer = new Filterer();
  cardDataSource: GridDataSource<Card>;

  constructor(private defaultCardService: CardService) {
    this.cardService = defaultCardService;
  }

  ngOnInit(): void {
    this.cardDataSource = new GridDataSource<Card>(this.cardService, this.paginator, this.searchGrid.sort, this.filterer);
  }
}
