import { Component, Input, OnChanges, OnInit } from '@angular/core';

import { AuthenticationService } from '../../../authentication/services/authentication.service';
import { GravatarService } from '../../../core/gravatar/gravatar.service';

@Component({
  selector: 'mco-gravatar-icon',
  templateUrl: './gravatar-icon.component.html',
  styleUrls: ['./gravatar-icon.component.scss'],
})
export class GravatarIconComponent implements OnChanges, OnInit {
  @Input() email?: string;
  @Input() size?: number;

  gravatarUrl: string;

  constructor(
    private gravatarService: GravatarService,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.updateUrl();
  }

  ngOnChanges(): void {
    this.updateUrl();
  }

  private updateUrl(): void {
    const email = this.email ? this.email : this.authenticationService.email;
    this.gravatarUrl = this.gravatarService.constructUrl({
      email: email,
      size: this.size,
    });
  }
}
