import { Selector } from 'testcafe';

class ListSpotPage {
  constructor() {
    this.pageId = '#list-spot-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.expect(this.pageSelector.exists).ok();
    const cardCount = Selector('.ui .card').count;
    await testController.expect(cardCount).eql(25);
  }

  async isDisplayedAfterAdd(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.expect(this.pageSelector.exists).ok();
    const cardCount = Selector('.ui .card').count;
    await testController.expect(cardCount).eql(26);
  }

  async searchspot(testController, query) {
    const loggedInUser = await Selector('#navbar-current-user').exists;
    if (loggedInUser) {
      await testController.typeText('#search-form-text', query);
      await testController.click('#search-form-submit');
      const cardCount = Selector('.ui .card').count;
      await testController.expect(cardCount).eql(1);
    }
  }
}

export const listSpotPage = new ListSpotPage();
