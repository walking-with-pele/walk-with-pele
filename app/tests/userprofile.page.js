import { Selector } from 'testcafe';

class UserProfilePage {
  constructor() {
    this.pageId = '#user-profile-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.expect(this.pageSelector.exists).ok();
  }

  async likedSpots(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.expect(this.pageSelector.exists).ok();
    const spotCount = Selector('.list .item').count;
    await testController.expect(spotCount).eql(1);
  }

  async visitedSpots(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.expect(this.pageSelector.exists).ok();
    const spotCount = Selector('.list .item').count;
    await testController.expect(spotCount).eql(2);
  }
}

export const userProfilePage = new UserProfilePage();
