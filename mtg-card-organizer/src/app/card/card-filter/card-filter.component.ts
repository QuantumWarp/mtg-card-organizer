import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { PageSortFilter } from '../../shared/filtering/page-sort-filter';
import { Set } from '../models/set';
import { SetService } from '../services/set.service';
import { CardQuery } from '../models/card-query';

@Component({
  selector: 'app-card-filter',
  templateUrl: './card-filter.component.html'
})
export class CardFilterComponent implements OnInit {
  @Output() filterChanged = new EventEmitter<CardQuery>();

  sets: Array<Set>;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private setService: SetService) { }

  ngOnInit(): void {
    this.setService.query(new PageSortFilter()).subscribe(results => {
      this.sets = results.data.sort((x, y) => x.name > y.name ? 1 : -1);
    });

    this.form = this.formBuilder.group({
      setIds: [[], ],
      name: [, ],
      text: [, ],
      type: [, ],
    });
  }

  apply(): void {
    const filter = Object.assign(new CardQuery(), this.form.value);

    // TODO: this is too dynamic
    filter.name = filter.name ? [ filter.name ] : [];
    filter.text = filter.text ? [ filter.text ] : [];
    filter.type = filter.type ? [ filter.type ] : [];

    this.filterChanged.emit(filter);
  }
}
