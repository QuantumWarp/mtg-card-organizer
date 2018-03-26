import { LoginPage } from './login.po';
import { browser } from 'protractor';
import { LayoutContainer } from '../layout-container/layout-container.po';

describe('Login Flow', () => {
  let loginPage: LoginPage;
  let layoutContainer: LayoutContainer;

  beforeEach(() => {
    loginPage = new LoginPage();
    layoutContainer = new LayoutContainer();
  });

  it('should navigate to login page', () => {
    loginPage.navigateTo();
    expect(loginPage.signInButton.isDisplayed()).toBe(true);
  });

  it('should login to homepage', () => {
    loginPage.enterInformationAndLogin();
    expect(layoutContainer.userButton.isDisplayed()).toBe(true);
  });

  it('should logout', () => {
    layoutContainer.logout();
    expect(loginPage.signInButton.isDisplayed()).toBe(true);
  });
});
