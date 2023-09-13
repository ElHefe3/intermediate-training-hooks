export const profileMenuLogoutTest = (authentication: AuthenticationData) => {
  cy.get('div').contains(authentication.email).click();
  cy.get('div').contains('Sign Out').click();
};
