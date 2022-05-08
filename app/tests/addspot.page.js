import { Selector } from 'testcafe';

class AddSpotPage {
  constructor() {
    this.pageId = '#add-spot-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.expect(this.pageSelector.exists).ok();
  }

  async addspot(testController, name, address, description, coordX, coordY) {
    const loggedInUser = await Selector('#navbar-current-user').exists;
    if (loggedInUser) {
      await testController.typeText('#add-form-name', name);
      await testController.typeText('#add-form-address', address);
      await testController.typeText('#add-form-description', description);
      await testController.typeText('#add-form-x', coordX);
      await testController.typeText('#add-form-y', coordY);
      await testController.click('#add-form-submit');
      await testController.click(Selector('.swal-button--confirm'));
    }
  }
}

export const addSpotPage = new AddSpotPage();
