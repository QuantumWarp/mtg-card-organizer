import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { CardDetailsModalComponent } from '../../card/card-details/card-details-modal.component';
import { CardSearchComponent } from '../../card/card-search/card-search.component';
import { Card } from '../../card/models/card';
import { Collection } from '../models/collection';
import { CollectionCardServiceWrapper, CollectionService } from '../services/collection.service';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

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

  cardSelected(card: Card): void {
    const dialogRef = this.dialog.open(CardDetailsModalComponent);
    dialogRef.componentInstance.card = card;
  }
}
