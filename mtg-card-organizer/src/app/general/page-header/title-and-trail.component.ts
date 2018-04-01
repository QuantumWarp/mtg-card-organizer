import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-title-and-trail',
  templateUrl: './title-and-trail.component.html',
  styleUrls: ['./page-header.scss']
})
export class TitleAndTrailComponent implements OnChanges {
  @Input() title: string;
  @Input() trail: string[];
  fullTrail: string;

  ngOnChanges(): void {
    this.fullTrail = this.trail ? this.trail.join(', ') + ' >' : null;
  }
}
