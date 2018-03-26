import { browser, by, element } from 'protractor';
import { waitForAnimation } from '../helper';

export class LayoutContainer {
  get userButton() {
    return element(by.css('app-gravatar-icon'));
  }

  get logoutButton() {
    return element(by.cssContainingText('.mat-menu-content .mat-menu-item', 'Logout'));
  }

  navigateTo() {
    return browser.get('/home');
  }

  logout() {
    this.userButton.click();
    waitForAnimation();
    this.logoutButton.click();
  }

  navigate(...menuStrings: string[]) {
    browser.actions().mouseMove(element(by.css('.nav-container'))).perform();
    waitForAnimation();
    menuStrings.forEach(menuString => {
      element.all(by.cssContainingText('app-nav-node', menuString)).first().click();
      waitForAnimation();
    });
    browser.actions().mouseMove(this.userButton).perform();
  }
}
