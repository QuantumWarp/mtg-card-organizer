import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatPaginator } from '@angular/material';

import { LoadingService } from '../../core/loading/loading.service';
import { PageSortFilter } from '../../shared/filtering/page-sort-filter';
import { PropertyFilter } from '../../shared/filtering/property-filter';
import { PropertyFilterOperator } from '../../shared/filtering/property-filter-operator';
import { GridDataSource } from '../../shared/grid/grid-data-source';
import { CardOtherInfo } from '../models/card-other-info';
import { Set } from '../models/set';
import { CardService } from '../services/card.service';
import { SetService } from '../services/set.service';
import { RapidEntryResult } from './rapid-entry-result';
import { RapidEntryResultGridComponent } from './rapid-entry-result-grid.component';
import { RapidEntryResultStore } from './rapid-entry-result.store';

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
    private cardService: CardService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<CardRapidEntryComponent>,
    @Inject(MAT_DIALOG_DATA) private processPromise: (coi: CardOtherInfo[]) => Promise<boolean>) { }

  ngOnInit(): void {
    this.processPromise = this.processPromise ? this.processPromise : () => Promise.resolve(true);
    this.setService.query().subscribe(results => {
      this.sets = results.data;
    });

    this.dialogRef.afterOpen().subscribe(() => setTimeout(() => this.searchTextBox.nativeElement.focus(), 0));
    this.rapidEntryResultDataSource = new GridDataSource<RapidEntryResult>(this.rapidEntryResultStore, this.paginator, this.resultGrid.sort);
  }

  applySetFilter(selectedSetIds: number[]): void {
    this.selectedSetIds = selectedSetIds;
  }

  openLatestError(): void {
    const firstError = this.rapidEntryResultStore.rapidEntryResults.find(x => x.hasError);
    if (firstError) {
      this.resultGrid.singleEntryView(firstError, this.selectedSetIds);
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  apply(): void {
    if (!this.rapidEntryResultStore.rapidEntryResults.find(x => x.hasError)) {
      const cardOtherInfos = this.rapidEntryResultStore.rapidEntryResults.map(x => {
        const command = new CardOtherInfo();
        command.cardSetInfoId = x.results[0].cardId;
        command.foil = x.cardOtherInfo.foil;
        command.promo = x.cardOtherInfo.promo;
        return command;
      });
      const processPromise = this.processPromise(cardOtherInfos);
      this.loadingService.load('Processing...', processPromise);
      processPromise.then(success => {
        if (success === false) {
          return;
        }
        this.dialogRef.close(cardOtherInfos);
      });
    } else {
      this.openLatestError();
    }
  }

  search(keyEvent: KeyboardEvent): void {
    switch (keyEvent.code) {
      case 'ArrowDown':
        this.openLatestError();
        return;
      case 'Enter': break;
      default: return;
    }

    const psFilter = new PageSortFilter();
    if (this.selectedSetIds.length !== 0) {
      psFilter.addSubFilter(new PropertyFilter({
        property: 'setId',
        operator: PropertyFilterOperator.IsContainedIn,
        value: this.selectedSetIds,
      }));
    }
    psFilter.addSubFilter(new PropertyFilter({
      property: 'name',
      operator: PropertyFilterOperator.Contains,
      value: this.searchText === '' ? this.lastSearchText : this.searchText,
    }));
    psFilter.paging.limit = 11;

    if (this.searchText === '') {
      this.triggerSearch(this.lastSearchText, psFilter);
      return;
    }

    this.triggerSearch(this.searchText, psFilter);

    this.lastSearchText = this.searchText;
    this.searchText = '';
  }

  private triggerSearch(searchText: string, psFilter: PageSortFilter): void {
    this.cardService.query(psFilter).subscribe(result => {
      const rpr: RapidEntryResult = {
        entryText: searchText,
        selectedSetIds: this.selectedSetIds,
        hasError: result.data.length !== 1,
        results: result.data,
        cardOtherInfo: new CardOtherInfo()
       };
       this.rapidEntryResultStore.rapidEntryResults.splice(0, 0, rpr);
       this.rapidEntryResultDataSource.refresh();
    });
  }
}
