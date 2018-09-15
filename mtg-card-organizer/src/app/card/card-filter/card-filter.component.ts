import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Collection } from '../../collection/models/collection';
import { CollectionService } from '../../collection/services/collection.service';
import { CardQuery } from '../models/card-query';
import { Rarity } from '../models/rarity';
import { Set } from '../models/set';
import { SetService } from '../services/set.service';

@Component({
  selector: 'app-card-filter',
  templateUrl: './card-filter.component.html'
})
export class CardFilterComponent implements OnInit {
  @Output() filterChanged = new EventEmitter<CardQuery>();
  @Input() disableCollectionSearch = false;

  rarities = Rarity;
  collections: Collection[];

  sets: Array<Set>;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private setService: SetService,
    private collectionService: CollectionService) { }

  ngOnInit(): void {
    this.setService.query().subscribe(results => {
      this.sets = results.data.sort((x, y) => x.name > y.name ? 1 : -1);
    });

    if (!this.disableCollectionSearch) {
      this.collectionService.getMany().subscribe(pagedData => {
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
    });
  }

  apply(): void {
    const filter = Object.assign(new CardQuery(), this.form.value);

    // TODO: this is too dynamic
    filter.name = filter.name ? [ filter.name ] : [];
    filter.text = filter.text ? [ filter.text ] : [];
    filter.type = filter.type ? [ filter.type ] : [];

    this.filterChanged.emit(<CardQuery>filter);
  }
}
