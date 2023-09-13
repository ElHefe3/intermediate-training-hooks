export const navbarTest = () => {
  cy.get('div').contains('Welcome');
  cy.get('div').contains('Dashboard');
  cy.get('div').contains('Users');
};
