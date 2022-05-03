import { Selector } from 'testcafe';

class RandomSpotPage {
  constructor() {
    this.pageId = '#random-spot-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.expect(this.pageSelector.exists).ok();
    const cardCount = Selector('.ui .card').count;
    await testController.expect(cardCount).eql(1);
  }
}

export const randomSpotPage = new RandomSpotPage();
