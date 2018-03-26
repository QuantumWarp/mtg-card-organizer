import { browser, by, element } from 'protractor';

export class CardSearchPage {
  get grid() {
    return element(by.css('app-card-search'));
  }

  navigateTo() {
    return browser.get('/cards/search');
  }
}
