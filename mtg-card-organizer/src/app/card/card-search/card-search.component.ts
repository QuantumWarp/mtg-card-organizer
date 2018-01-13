import { Component, EventEmitter, Inject, OnInit, Output, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material';

import { Filterer } from '../../general/grid/filterer';
import { GridDataSource } from '../../general/grid/grid-data-source';
import { DataService } from '../../general/grid/grid-data-source.interfaces';
import { Card } from '../models/card';
import { CardService } from '../services/card.service';
import { CardSearchGridComponent } from './card-search-grid.component';
import { Observable } from 'rxjs/Observable';
import { PagedData } from '../../general/grid/paged-data';
import { PageSortFilter } from '../../general/grid/page-sort-filter';

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
  @Input() cardService: CardService;

  constructor(private defaultCardService: CardService) {
    this.cardService = defaultCardService;
  }

  ngOnInit(): void {
    this.cardDataSource = new GridDataSource<Card>(this.cardService, this.paginator, this.searchGrid.sort, this.filterer);
  }
}
