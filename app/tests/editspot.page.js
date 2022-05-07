import { Selector } from 'testcafe';

class EditSpotPage {
  constructor() {
    this.pageId = '#edit-spot-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.expect(this.pageSelector.exists).ok();
  }

  async editspot(testController, newName) {
    const loggedInUser = await Selector('#navbar-current-user').exists;
    if (loggedInUser) {
      await testController.click('#edit-spot-name');
      await testController.pressKey('ctrl+a delete');
      await testController.typeText('#edit-spot-name', newName);
      await testController.click('#edit-spot-submit');
      await testController.click(Selector('.swal-button--confirm'));
    }
  }
}

export const editSpotPage = new EditSpotPage();
