import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Collection } from '../../collection/models/collection';
import { CollectionService } from '../../collection/services/collection.service';
import { CardQuery } from '../models/card-query';
import { Rarity } from '../models/rarity';
import { Set } from '../models/set';
import { SetService } from '../services/set.service';
import { CardFilterData } from './card-filter-data';

@Component({
  selector: 'mco-card-filter',
  templateUrl: './card-filter.component.html',
  styleUrls: ['./card-filter.component.scss'],
})
export class CardFilterComponent implements OnInit {
  rarities = Rarity;
  collections: Collection[];

  sets: Array<Set>;
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CardFilterData,
    private formBuilder: FormBuilder,
    private setService: SetService,
    private collectionService: CollectionService,
    private dialogRef: MatDialogRef<CardFilterComponent>,
  ) { }

  ngOnInit(): void {
    if (this.data.cardSetSearch) {
      this.setService.query().subscribe(results => {
        this.sets = results.data.sort((x, y) => x.name > y.name ? 1 : -1);
      });
    }

    if (this.data.collectionSearch) {
      this.collectionService.getBookmarks().subscribe(pagedData => {
        this.collections = pagedData.data;
      });
    }

    this.form = this.formBuilder.group({
      name: [, ],
      text: [, ],
      type: [, ],

      setIds: [[], ],
      rarities: [[], ],
      nums: [[], ],

      collectionIds: [[], ],
      groupByCard: [[], ],
      groupByCardSet:  [[], ],
    });

    if (this.data.currentFilter) {
      this.form.patchValue({
        ...this.data.currentFilter,
        name: this.data.currentFilter.name[0],
        text: this.data.currentFilter.text[0],
        type: this.data.currentFilter.type[0],
      });
    }
  }

  apply(): void {
    const filter = Object.assign(new CardQuery(), this.form.value);

    filter.name = filter.name ? [ filter.name ] : [];
    filter.text = filter.text ? [ filter.text ] : [];
    filter.type = filter.type ? [ filter.type ] : [];

    this.dialogRef.close(filter);
  }
}
