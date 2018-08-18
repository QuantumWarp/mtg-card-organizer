import { Component, ViewChild, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { RapidEntryResult } from './rapid-entry-result';
import { Set } from '../models/set';
import { SetService } from '../services/set.service';
import { CardSet } from '../models/card-set';
import { CollectionCardService } from '../../collection/services/collection-card.service';
import { Collection } from '../../collection/models/collection';
import { SnackNotificationService } from '../../core/notifications/snack-notification.service';
import { SnackNotificationType } from '../../core/notifications/snack-notification.type';

@Component({
  selector: 'app-card-rapid-entry-result',
  templateUrl: './card-rapid-entry-result.component.html',
  styleUrls: ['./card-rapid-entry.scss']
})
export class CardRapidEntryResultComponent implements OnInit {
  @Output() applied = new EventEmitter();
  @Input() collection: Collection;

  rapidEntryResult: RapidEntryResult;
  sets: Set[];

  get detailString(): string {
    if (!this.rapidEntryResult) { return 'Awaiting Input'; }
    if (this.rapidEntryResult.results.length === 1) { return 'Matched'; }

    return this.rapidEntryResult.results.length === 0 ? 'No matches found' :
      (this.rapidEntryResult.totalCount > this.rapidEntryResult.results.length ? 'Multiple matches found (Over 10)' : 'Multiple matches found');
  }

  constructor(
    private setService: SetService,
    private collectionCardService: CollectionCardService,
    private snackNotificationService: SnackNotificationService) { }

  setById(id: number): Set {
    return this.sets.find(x => x.id === id);
  }

  ngOnInit(): void {
    this.setService.query().subscribe(x => this.sets = x.data);
  }

  clear(): void {
    this.rapidEntryResult = undefined;
  }

  applyNewResult(rapidEntryResult: RapidEntryResult): void {
    if (!this.rapidEntryResult) {
      this.rapidEntryResult = rapidEntryResult;
      return;
    }

    this.collectionCardService.addCards(this.collection.id, [ this.rapidEntryResult.cardInstance ]).subscribe(() => {
      this.snackNotificationService.notify({
        type: SnackNotificationType.Success,
        message: 'Added ' + this.rapidEntryResult.entryText,
      });
      this.rapidEntryResult = rapidEntryResult;
      this.applied.emit();
    });
  }

  optionClicked(cardSet: CardSet): void {
    console.log(cardSet);
    this.rapidEntryResult.entryText = cardSet.card.name;
    this.rapidEntryResult.cardInstance.cardSetId = cardSet.id;
    this.rapidEntryResult.results = [ cardSet ];
    this.rapidEntryResult.totalCount = 1;
  }
}
