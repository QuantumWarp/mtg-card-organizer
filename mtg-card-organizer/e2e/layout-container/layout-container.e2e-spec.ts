import { browser } from 'protractor';
import { LayoutContainer } from '../layout-container/layout-container.po';
import { LoginPage } from '../login/login.po';
import { CardSearchPage } from '../card-search/card-search.po';

describe('Layout Container Tests', () => {
  let layoutContainer: LayoutContainer;

  beforeEach(() => {
    layoutContainer = new LayoutContainer();
  });

  it('should navigate to login page', () => {
    LoginPage.runLoginFlow();
    layoutContainer.navigate('Tools', 'Card Search');
    expect(new CardSearchPage().grid.isDisplayed()).toBe(true);
  });
});
