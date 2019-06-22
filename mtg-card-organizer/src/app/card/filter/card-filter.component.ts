import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
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

  get collectionIdsControl(): AbstractControl {
    return this.form.get('collectionIds');
  }

  get groupingControl(): AbstractControl {
    return this.form.get('grouping');
  }

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
      grouping: [[], ],
    });

    if (this.data.currentFilter) {
      this.form.patchValue({
        ...this.data.currentFilter,
        name: this.data.currentFilter.name[0],
        text: this.data.currentFilter.text[0],
        type: this.data.currentFilter.type[0],
        grouping: this.data.currentFilter.groupByCardSet ? 2 : (this.data.currentFilter.groupByCard ? 1 : 0),
      });
    }

    this.collectionIdsControl.valueChanges.subscribe(x => {
      if (this.groupingControl.value === 0 && x.length === 0) {
        this.groupingControl.patchValue(1);
      }
    });
  }

  apply(): void {
    const filter = Object.assign(new CardQuery(), this.form.value);
    console.log(filter);

    filter.name = filter.name ? [ filter.name ] : [];
    filter.text = filter.text ? [ filter.text ] : [];
    filter.type = filter.type ? [ filter.type ] : [];
    filter.groupByCardSet = filter.grouping === 2;
    filter.groupByCard = filter.grouping === 1;

    this.dialogRef.close(filter);
  }
}
