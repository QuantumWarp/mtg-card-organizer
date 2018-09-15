import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { FormBuilder, FormGroup } from '@angular/forms';

import { CardQuery } from '../../../card/models/card-query';
import { Set } from '../../../card/models/set';
import { CardSetService } from '../../../card/services/card-set.service';
import { SetService } from '../../../card/services/set.service';
import { Collection } from '../../../collection/models/collection';
import { Paging } from '../../../shared/filtering/paging';
import { CardInstance } from '../../models/card-instance';
import { CardRapidEntryResultComponent } from '../card-rapid-entry-result/card-rapid-entry-result.component';
import { RapidEntryResult } from '../rapid-entry-result';

@Component({
  selector: 'app-card-rapid-entry',
  templateUrl: './card-rapid-entry.component.html',
  styleUrls: ['./card-rapid-entry.component.scss']
})
export class CardRapidEntryComponent implements OnInit {
  @Output() searched = new EventEmitter();

  @ViewChild(CardRapidEntryResultComponent) resultComponent: CardRapidEntryResultComponent;
  @Input() collection: Collection;
  form: FormGroup;

  sets: Set[];
  selectedSetIds = new Array<number>();

  searchText: string;
  lastSearchText: string;

  constructor(
    private setService: SetService,
    private cardSetService: CardSetService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.setService.query().subscribe(results => this.sets = results.data);
    this.form = this.formBuilder.group({
      name: [, ],
      setIds: [, ],
    });
  }

  keyPressed(keyEvent: KeyboardEvent): void {
    switch (keyEvent.key) {
      case 'Enter': this.search(); break;
    }
  }

  private search(): void {
    if (!this.form.value.name) { return; }

    const cardQuery = new CardQuery();
    cardQuery.paging = new Paging({ limit: 10 });
    cardQuery.setIds = this.form.value.setIds ? this.form.value.setIds : [];

    if (cardQuery.setIds && cardQuery.setIds.length === 1 && !isNaN(Number(cardQuery.name))) {
      cardQuery.nums = [ this.form.value.name ];
    } else {
      cardQuery.name = [ this.form.value.name ];
    }

    this.cardSetService.query(cardQuery).subscribe(results => {
      const newResult = new RapidEntryResult({
        cardInstance: new CardInstance(),
        entryText: cardQuery.name[0],
        results: results.data,
        totalCount: results.totalCount,
      });
      this.resultComponent.applyNewResult(newResult);
    });
    this.form.get('name').setValue('');
  }
}
