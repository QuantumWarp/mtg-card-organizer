import { Component, Input, ViewChild } from '@angular/core';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { MatDialog } from '@angular/material';

import { CardDetailsModalComponent } from '../../card/card-details/card-details-modal.component';
import { CardSearchComponent } from '../../card/card-search/card-search.component';
import { CardInstance } from '../../card/models/card-instance';
import { Collection } from '../models/collection';
import { CollectionCardServiceWrapper, CollectionService } from '../services/collection.service';

@Component({
  selector: 'app-collection-cards',
  templateUrl: './collection-cards.component.html',
  styleUrls: ['../collection.scss']
})
export class CollectionCardsComponent implements OnChanges {
  @Input() collection: Collection;
  @ViewChild(CardSearchComponent) cardSearchComponent: CardSearchComponent;
  collectionCardServiceWrapper: CollectionCardServiceWrapper;

  constructor(
    private dialog: MatDialog,
    private collectionService: CollectionService) { }

  ngOnChanges(): void {
    this.collectionCardServiceWrapper = new CollectionCardServiceWrapper(this.collection.id, this.collectionService);
  }

  cardInstanceSelected(cardInstance: CardInstance): void {
    const dialogRef = this.dialog.open(CardDetailsModalComponent);
    dialogRef.componentInstance.cardInstance = cardInstance;
  }
}
