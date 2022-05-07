import { Selector } from 'testcafe';

class SpotPage {
  constructor() {
    this.pageId = '#spot-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.expect(this.pageSelector.exists).ok();
  }

  async addcomment(testController, comment) {
    const loggedInUser = await Selector('#navbar-current-user').exists;
    if (loggedInUser) {
      await testController.click('#add-comment-popup');
      await testController.typeText('#comment-form-text', comment);
      await testController.click('#comment-form-submit');
      await testController.click(Selector('.swal-button--confirm'));
    }
  }

  async addlike(testController) {
    const loggedInUser = await Selector('#navbar-current-user').exists;
    if (loggedInUser) {
      await testController.click('#add-like');
      const likes = await Selector('#number-likes').innerText;
      await testController.expect(likes).eql('29');
    }
  }

  async markvisited(testController) {
    const loggedInUser = await Selector('#navbar-current-user').exists;
    if (loggedInUser) {
      await testController.click('#mark-visited');
    }
  }

  async checkcomment(testController, comment) {
    const spotComment = Selector('#spot-comment-text').innerText;
    await testController.expect(spotComment).eql(comment);
  }
}

export const spotPage = new SpotPage();
