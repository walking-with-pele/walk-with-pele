import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { spotComp } from './spotcomp.component';
import { randomSpotPage } from './randomspot.page';
import { topSpotPage } from './topspot.page';
import { listSpotPage } from './listspot.page';
import { addSpotPage } from './addspot.page';
import { mapPage } from './map.page';
import { userProfilePage } from './userprofile.page';
import { adminPage } from './admin.page';
import { spotPage } from './spotpage.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };
const credentialsAdmin = { username: 'admin@foo.com', password: 'changeme' };

fixture('walking-with-pele localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test the Random Spot page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoRandomSpotPage(testController);
  await randomSpotPage.isDisplayed(testController);
});

test('Test the Top Spot page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoTopSpotPage(testController);
  await topSpotPage.isDisplayed(testController);
});

test('Test the List Spot page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoListSpotPage(testController);
  await listSpotPage.isDisplayed(testController);
});

test('Test View Spot button on Spot component', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoListSpotPage(testController);
  await listSpotPage.isDisplayed(testController);
  await spotComp.viewPage(testController);
  await spotPage.isDisplayed(testController);
});

test('Test Add Comment button on Spot page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoListSpotPage(testController);
  await listSpotPage.isDisplayed(testController);
  await spotComp.viewPage(testController);
  await spotPage.isDisplayed(testController);
  await spotPage.addcomment(testController, 'great place!');
});

test('Test Search Filter on List Spots page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoListSpotPage(testController);
  await listSpotPage.isDisplayed(testController);
  await listSpotPage.searchspot(testController, 'Salt Lake-Moanalua Public Library');
});

test('Test the Add Spot page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoAddSpotPage(testController);
  await addSpotPage.isDisplayed(testController);
});

test('Test the Add Spot form', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoAddSpotPage(testController);
  await addSpotPage.isDisplayed(testController);
  await addSpotPage.addspot(testController, 'Waianae Beach', 'Waianae', 'images/meteor-logo.png', 'A beach in Waianae', '12', '13');
  await navBar.gotoListSpotPage(testController);
  await listSpotPage.isDisplayedAfterAdd(testController);
});

test('Test the Map page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoMapPage(testController);
  await mapPage.isDisplayed(testController);
});

test('Test the User Profile page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoUserProfilePage(testController);
  await userProfilePage.isDisplayed(testController);
});

test('Test the Admin page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentialsAdmin.username, credentialsAdmin.password);
  await navBar.isLoggedIn(testController, credentialsAdmin.username);
  await navBar.gotoAdminPage(testController);
  await adminPage.isDisplayed(testController);
});
