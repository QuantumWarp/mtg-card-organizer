import { Component, Input, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { SnackNotificationModel } from '../../core/notifications/snack-notification.model';
import { SnackNotificationService } from '../../core/notifications/snack-notification.service';
import { SnackNotificationType } from '../../core/notifications/snack-notification.type';
import { Deck } from '../../deck/models/deck';
import { DeckService } from '../../deck/services/deck.service';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogData } from '../../shared/components/confirm-dialog/confirm-dialog.data';

@Component({
  selector: 'mco-deck-list',
  templateUrl: './deck-list.component.html',
  styleUrls: ['./deck-list.component.scss']
})
export class DeckListComponent {
  @Output() containerInvalidated = new EventEmitter();
  @Output() addClicked = new EventEmitter();

  @Input() decks: Deck[];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private snackNotificationService: SnackNotificationService,
    private deckService: DeckService) { }

  itemSelected(deck: Deck): void {
    this.router.navigateByUrl('/decks/' + deck.id);
  }

  deleteItem(deck: Deck): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: new ConfirmDialogData({
        title: 'Delete Deck',
        description: 'Are you sure you want to delete \'' + deck.name + '\'',
      })
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) { return; }
      this.deckService.delete(deck.id).subscribe(() => {
        this.snackNotificationService.notify(new SnackNotificationModel({
          message: '\'' + deck.name + '\' Deleted',
          type: SnackNotificationType.Success,
        }));
        this.containerInvalidated.emit();
      });
    });
  }
}
