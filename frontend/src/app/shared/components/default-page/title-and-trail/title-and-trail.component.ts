import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'mco-title-and-trail',
  templateUrl: './title-and-trail.component.html',
  styleUrls: ['./title-and-trail.component.scss'],
})
export class TitleAndTrailComponent implements OnChanges {
  @Input() title: string;
  @Input() trail: string[];

  fullTrail: string;

  ngOnChanges(): void {
    this.fullTrail = this.trail ? this.trail.join(', ') + ' >' : null;
  }
}
