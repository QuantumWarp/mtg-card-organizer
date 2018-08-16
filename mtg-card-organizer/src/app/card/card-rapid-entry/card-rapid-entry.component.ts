import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatPaginator } from '@angular/material';

import { LoadingService } from '../../core/loading/loading.service';
import { PageSortFilter } from '../../shared/filtering/page-sort-filter';
import { PropertyFilter } from '../../shared/filtering/property-filter';
import { PropertyFilterOperator } from '../../shared/filtering/property-filter-operator';
import { GridDataSource } from '../../shared/grid/grid-data-source';
import { Set } from '../models/set';
import { CardService } from '../services/card.service';
import { SetService } from '../services/set.service';
import { RapidEntryResult } from './rapid-entry-result';
import { RapidEntryResultGridComponent } from './rapid-entry-result-grid.component';
import { RapidEntryResultStore } from './rapid-entry-result.store';
import { CardInstance } from '../models/card-instance';
import { CardQuery } from '../models/card-query';
import { Paging } from '../../shared/filtering/paging';

@Component({
  selector: 'app-card-rapid-entry',
  templateUrl: './card-rapid-entry.component.html',
  styleUrls: ['./card-rapid-entry.scss']
})
export class CardRapidEntryComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('resultGrid') resultGrid: RapidEntryResultGridComponent;
  @ViewChild('searchTextBox') searchTextBox: ElementRef;

  sets: Set[];
  selectedSetIds = new Array<number>();

  searchText: string;
  lastSearchText: string;

  rapidEntryResultDataSource: GridDataSource<RapidEntryResult>;
  rapidEntryResultStore = new RapidEntryResultStore();

  constructor(
    private loadingService: LoadingService,
    private setService: SetService,
    private cardService: CardService) { }

  ngOnInit(): void {
    this.setService.query().subscribe(results => {
      this.sets = results.data;
    });
    this.searchTextBox.nativeElement.focus();
  }

  openLatestError(): void {
    const firstError = this.rapidEntryResultStore.rapidEntryResults.find(x => x.hasError);
    if (firstError) {
      this.resultGrid.singleEntryView(firstError, this.selectedSetIds);
    }
  }

  apply(): void {
    // if (!this.rapidEntryResultStore.rapidEntryResults.find(x => x.hasError)) {
    //   const cardOtherInfos = this.rapidEntryResultStore.rapidEntryResults.map(x => {
    //     const command = new CardInstance();
    //     command.cardSetId = x.results[0].id;
    //     command.foil = x.cardInstance.foil;
    //     command.promo = x.cardInstance.promo;
    //     return command;
    //   });
    //   const processPromise = this.processPromise(cardOtherInfos);
    //   this.loadingService.load('Processing...', processPromise);
    //   processPromise.then(success => {
    //     if (success === false) {
    //       return;
    //     }
    //     this.dialogRef.close(cardOtherInfos);
    //   });
    // } else {
    //   this.openLatestError();
    // }
  }

  search(keyEvent: KeyboardEvent): void {
    switch (keyEvent.code) {
      case 'ArrowDown':
        this.openLatestError();
        return;
      case 'Enter': break;
      default: return;
    }

    const cardQuery = new CardQuery({
      setIds: this.selectedSetIds,
      name: [ this.searchText === '' ? this.lastSearchText : this.searchText ],
      paging: new Paging({
        limit: 11,
      })
    });

    if (this.searchText === '') {
      this.triggerSearch(this.lastSearchText, cardQuery);
      return;
    }

    this.triggerSearch(this.searchText, cardQuery);

    this.lastSearchText = this.searchText;
    this.searchText = '';
  }

  private triggerSearch(searchText: string, cardQuery: CardQuery): void {
    this.cardService.query(cardQuery).subscribe(result => {
      const rpr: RapidEntryResult = {
        entryText: searchText,
        selectedSetIds: this.selectedSetIds,
        hasError: result.data.length !== 1,
        results: result.data,
        cardInstance: new CardInstance()
       };
       this.rapidEntryResultStore.rapidEntryResults.splice(0, 0, rpr);
       this.rapidEntryResultDataSource.refresh();
    });
  }
}
