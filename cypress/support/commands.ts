Cypress.Commands.add('login', (authenticationData: AuthenticationData) => {
  cy.visit('/login');
  cy.get('input[name=username]').type(authenticationData.email);
  cy.get('input[name=password]').type(`${authenticationData.password}`);
  cy.get('button').contains('Login').click();
});

export {};
