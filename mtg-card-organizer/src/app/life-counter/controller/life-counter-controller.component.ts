import { Component, HostListener, Input, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { LifeCounterModel } from '../life-counter.model';
import { LifeCounterHandler } from './life-counter-handler';
import { Form, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material';
import { filter } from 'rxjs/internal/operators';
import { LifeCounterConfig } from '../life-counter-config.model';

@Component({
  selector: 'mco-life-counter-controller',
  templateUrl: './life-counter-controller.component.html',
  styleUrls: ['./life-counter-controller.component.scss'],
})
export class LifeCounterControllerComponent implements OnInit {
  @Input() lifeCounterModel: LifeCounterModel;
  @Input() lifeCounterConfig: LifeCounterConfig;

  private lifeCounterHandler: LifeCounterHandler;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.lifeCounterHandler = new LifeCounterHandler(this.lifeCounterModel);

    this.form = this.formBuilder.group({
      startingLife: [this.lifeCounterConfig.startingLife, Validators.required],
      playerNames: [this.lifeCounterConfig.playerNames, Validators.required],
    });
  }

  resetCounters(): void {
    if (!this.form.valid) { return; }

    const config = new LifeCounterConfig(
      this.form.get('startingLife').value,
      this.form.get('playerNames').value,
    );

    config.persist();

    this.lifeCounterModel.resetCounters(config);
  }

  addPlayerName(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      const playerNames = this.form.get('playerNames').value;
      playerNames.push(value.trim());
      this.form.get('playerNames').patchValue(playerNames);
    }

    if (input) {
      input.value = '';
    }
  }

  removePlayerName(name: string): void {
    const playerNames = this.form.get('playerNames').value;
    this.form.get('playerNames').patchValue(playerNames.filter(x => x !== name));
  }

  @HostListener('document:keyup', ['$event'])
  keyPress(keyEvent: KeyboardEvent): void {
    this.lifeCounterHandler.handleKeyPress(keyEvent);
  }
}
