import { Component, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';

import { CardDetailsModalComponent } from '../../card/card-details/card-details-modal.component';
import { CardSearchComponent } from '../../card/card-search/card-search.component';
import { Card } from '../../card/models/card';
import { Collection } from '../models/collection';
import { CollectionCardServiceWrapper, CollectionService } from '../services/collection.service';

@Component({
  selector: 'app-collection-cards',
  templateUrl: './collection-cards.component.html',
  styleUrls: ['../collection.scss']
})
export class CollectionCardsComponent {
  @Input() collection: Collection;
  @ViewChild(CardSearchComponent) cardSearchComponent: CardSearchComponent;
  collectionCardServiceWrapper: CollectionCardServiceWrapper;

  constructor(
    private dialog: MatDialog,
    private collectionService: CollectionService) { }

  refresh(): void {
    this.collectionCardServiceWrapper = new CollectionCardServiceWrapper(this.collection.id, this.collectionService);
    this.cardSearchComponent.cardDataSource.dataService = this.collectionCardServiceWrapper;
    this.cardSearchComponent.cardDataSource.reloadData();
  }

  cardSelected(card: Card): void {
    const dialogRef = this.dialog.open(CardDetailsModalComponent);
    dialogRef.componentInstance.card = card;
  }
}
