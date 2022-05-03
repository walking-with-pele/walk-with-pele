import { Selector } from 'testcafe';

class SpotComp {
  async viewPage(testController) {
    const loggedInUser = await Selector('#navbar-current-user').exists;
    if (loggedInUser) {
      await testController.click('#view-page');
    }
  }


}

export const spotComp = new SpotComp();
