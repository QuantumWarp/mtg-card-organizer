import { browser, by, element, ExpectedConditions } from 'protractor';
import { waitForUrl } from '../helper';

export class LoginPage {
  get usernameElement() {
    return element(by.css('input[placeholder="Username"]'));
  }

  get passwordElement() {
    return element(by.css('input[placeholder="Password"]'));
  }

  get signInButton() {
    return element(by.cssContainingText('button', 'Login'));
  }

  static runLoginFlow(): void {
    const loginPage = new LoginPage();
    loginPage.navigateTo();
    loginPage.enterInformationAndLogin();
  }

  enterInformationAndLogin(): void {
    this.usernameElement.sendKeys('QuantumWarp');
    this.passwordElement.sendKeys('admin123');
    this.signInButton.click();
    waitForUrl('/home');
  }

  navigateTo() {
    return browser.get('/auth/login');
  }
}
