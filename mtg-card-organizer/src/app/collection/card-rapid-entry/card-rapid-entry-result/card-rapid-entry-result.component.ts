import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CardSet } from '../../../card/models/card-set';
import { Set } from '../../../card/models/set';
import { SetService } from '../../../card/services/set.service';
import { Collection } from '../../../collection/models/collection';
import { CollectionCardService } from '../../../collection/services/collection-card.service';
import { SnackNotificationService } from '../../../core/notifications/snack-notification.service';
import { SnackNotificationType } from '../../../core/notifications/snack-notification.type';
import { RapidEntryResult } from '../rapid-entry-result';

@Component({
  selector: 'app-card-rapid-entry-result',
  templateUrl: './card-rapid-entry-result.component.html',
  styleUrls: ['./card-rapid-entry-result.component.scss']
})
export class CardRapidEntryResultComponent implements OnInit {
  @Output() applied = new EventEmitter();
  @Output() refocusEntry = new EventEmitter();
  @Input() collection: Collection;

  rapidEntryResult: RapidEntryResult;
  sets: Set[];

  get detailString(): string {
    if (!this.rapidEntryResult) { return 'Awaiting Input'; }
    if (this.rapidEntryResult.results.length === 1) { return 'Matched'; }

    return this.rapidEntryResult.results.length === 0 ? 'No Matches' :
      (this.rapidEntryResult.totalCount > this.rapidEntryResult.results.length ? 'Multiple Matches (Over 10)' : 'Multiple Matches');
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

  applyNewResult(rapidEntryResult?: RapidEntryResult): void {
    if (!this.rapidEntryResult || this.rapidEntryResult.totalCount === 0) {
      this.rapidEntryResult = rapidEntryResult;
      return;
    }

    if (this.rapidEntryResult.results.length > 1) {
      this.snackNotificationService.notify({
        type: SnackNotificationType.Warning,
        message: 'Please select a result or clear',
      });
      return;
    }

    this.rapidEntryResult.cardInstance.cardSetId = this.rapidEntryResult.results[0].id;

    this.collectionCardService.addCards(this.collection.id, [ this.rapidEntryResult.cardInstance ]).subscribe(() => {
      this.snackNotificationService.notify({
        type: SnackNotificationType.Success,
        message: 'Added ' + this.rapidEntryResult.results[0].card.name,
      });
      this.rapidEntryResult = rapidEntryResult;
      this.applied.emit();
      this.refocusEntry.emit();
    });
  }

  optionClicked(cardSet: CardSet): void {
    this.rapidEntryResult.entryText = cardSet.card.name;
    this.rapidEntryResult.results = [ cardSet ];
    this.rapidEntryResult.totalCount = 1;
    this.refocusEntry.emit();
  }
}
