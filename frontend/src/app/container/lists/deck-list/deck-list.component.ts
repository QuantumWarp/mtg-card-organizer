import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { SnackNotificationService } from '../../../core/notifications/snack-notification.service';
import { Deck } from '../../../deck/models/deck';
import { DeckService } from '../../../deck/services/deck.service';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogData } from '../../../shared/components/confirm-dialog/confirm-dialog.data';
import { AddDeckModalComponent } from '../../add-modals/deck/add-deck-modal.component';
import { Container } from '../../models/container';

@Component({
  selector: 'mco-deck-list',
  templateUrl: './deck-list.component.html',
  styleUrls: ['./deck-list.component.scss']
})
export class DeckListComponent {
  @Output() decksUpdated = new EventEmitter();

  @Input() container: Container;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private snackNotificationService: SnackNotificationService,
    private deckService: DeckService,
  ) { }

  viewDeck(deck: Deck): void {
    this.router.navigateByUrl('/decks/' + deck.id);
  }

  createDeck(): void {
    const dialogRef = this.dialog.open(AddDeckModalComponent, {
      data: this.container,
    });
    dialogRef.afterClosed().subscribe((success) => success && this.decksUpdated.emit());
  }

  deleteDeck(deck: Deck): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: <ConfirmDialogData> {
        title: 'Delete Deck',
        description: `Are you sure you want to delete '${deck.name}'`,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) { return; }

      this.deckService.delete(deck.id).subscribe(() => {
        this.snackNotificationService.notifySuccess(`'${deck.name}' Deleted`);
        this.decksUpdated.emit();
      });
    });
  }
}
