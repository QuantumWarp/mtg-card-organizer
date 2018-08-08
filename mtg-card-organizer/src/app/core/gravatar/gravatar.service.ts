import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5';

import { GravatarConfig } from './gravatar.config';


@Injectable()
export class GravatarService {
  private readonly baseUrl = 'https://secure.gravatar.com/avatar/';

  constructUrl(config: GravatarConfig): string {
    let url = this.baseUrl;
    url = url + this.constructEmailHash(config.email);
    url = this.addPart(url, this.constructSize(config.size));
    url = this.addPart(url, this.constructDefault());
    return url;
  }

  private constructEmailHash(email: string): string {
    email = email ? email : '';
    let hash = email.trim();
    hash = hash.toLowerCase();
    hash = Md5.hashStr(hash).toString();
    return hash;
  }

  private addPart(currentUrl: string, part: string): string {
    if (!part) {
      return currentUrl;
    }
    currentUrl = currentUrl + (currentUrl.includes('?') ? '&' : '?');
    currentUrl = currentUrl + part;
    return currentUrl;
  }

  private constructSize(size?: number): string {
    return size ? 's=' + size.toString() : null;
  }

  private constructDefault(): string {
    return 'd=mm';
  }
}
