import { authenticationData } from '../helpers';
import { navbarTest, profileMenuLogoutTest } from './dashboard-tests';

describe('Dashboard tests', () => {
  beforeEach(() => {
    cy.login(authenticationData);
  });

  it('Navbar test', () => {
    navbarTest();
  });

  it('Profile menu logout test', () => {
    profileMenuLogoutTest(authenticationData);
  });
});
