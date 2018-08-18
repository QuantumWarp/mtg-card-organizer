import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { DataService } from '../../shared/utils/data-service.interface';
import { CardInstance } from '../models/card-instance';
import { CardQuery } from '../models/card-query';
import { Set } from '../models/set';
import { CardSetService, CardServiceInstanceWrapper } from '../services/card.service';
import { SetService } from '../services/set.service';
import { BasicGridComponent } from '../../shared/grid/basic-grid/basic-grid.component';

@Component({
  selector: 'app-card-instance-grid',
  templateUrl: './card-instance-grid.component.html',
  styleUrls: ['../card.scss']
})
export class CardInstanceGridComponent implements OnInit {
  @Output() cardInstanceSelected = new EventEmitter<CardInstance>();

  @ViewChild(BasicGridComponent) basicGrid: BasicGridComponent<CardInstance>;
  @Input() sets: Set[];
  @Input() filter = new CardQuery();

  @Input() displayedColumns = ['name', 'setSymbol', 'manaCost'];
  @Input() cardService: DataService<CardInstance>;

  constructor(
    public defaultCardService: CardSetService,
    private setService: SetService) {
    this.cardService = new CardServiceInstanceWrapper(defaultCardService);
  }

  ngOnInit(): void {
    this.setService.query().subscribe(results => this.sets = results.data);
  }
}
