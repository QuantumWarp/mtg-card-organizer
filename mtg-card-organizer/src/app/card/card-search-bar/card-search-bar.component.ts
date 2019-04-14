import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/internal/operators';

@Component({
  selector: 'mco-card-search-bar',
  templateUrl: './card-search-bar.component.html',
})
export class CardSearchBarComponent implements OnInit {
  @Output() basicFilter = new EventEmitter<string>();
  nameControl = new FormControl();

  ngOnInit(): void {
    this.nameControl.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged()
      ).subscribe(value => this.basicFilter.emit(value));
  }
}
