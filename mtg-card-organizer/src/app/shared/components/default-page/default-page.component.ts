import { Component, Input } from '@angular/core';

@Component({
  selector: 'mco-default-page',
  templateUrl: './default-page.component.html',
  styleUrls: ['./default-page.component.scss']
})
export class DefaultPageComponent {
  @Input() title: string;
  @Input() trail: string[];
}
