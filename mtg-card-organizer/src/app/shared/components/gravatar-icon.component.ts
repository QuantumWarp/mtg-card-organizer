import { Component, Input, OnChanges, OnInit } from '@angular/core';

import { AuthenticationService } from '../../authentication/services/authentication.service';
import { GravatarService } from '../../core/gravatar/gravatar.service';

@Component({
  selector: 'app-gravatar-icon',
  templateUrl: './gravatar-icon.component.html'
})
export class GravatarIconComponent implements OnChanges, OnInit {
  @Input() email?: string;
  @Input() size?: number;

  gravatarUrl: string;

  constructor(
    private gravatarService: GravatarService,
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.ngOnChanges();
  }

  ngOnChanges(): void {
    const email = this.email ? this.email : this.authenticationService.email;
    this.gravatarUrl = this.gravatarService.constructUrl({
      email: email,
      size: this.size,
    });
  }
}
