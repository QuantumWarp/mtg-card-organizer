import { browser, protractor, ExpectedConditions } from 'protractor';

export const slowProtractor = function(delay: number): void {
  const origFn = browser.driver.controlFlow().execute;

  browser.driver.controlFlow().execute = function() {
    const args = arguments;

    origFn.call(browser.driver.controlFlow(), function() {
      return protractor.promise.delayed(delay);
    });

    return origFn.apply(browser.driver.controlFlow(), args);
  };
};

export const waitForAnimation = function(delay = 200): void {
  browser.sleep(delay);
};

export const waitForUrl = function(urlString: string): void {
  // TODO: make this more precise
  browser.wait(ExpectedConditions.urlContains(urlString));
};
