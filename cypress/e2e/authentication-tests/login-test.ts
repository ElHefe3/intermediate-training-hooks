export const loginTest = (authenticationData: AuthenticationData) => {
  cy.get('input[name=username]').type(authenticationData.email);
  cy.get('input[name=password]').type(authenticationData.password);
  cy.get('button').contains('Login').click();
};

export const invalidEmailTest = (authenticationData: AuthenticationData) => {
  cy.get('input[name=username]').type('invalid-email');
  cy.get('input[name=password]').type(authenticationData.password);
  cy.get('button').contains('Login').click();
  cy.get('div').contains('Must be a valid email');
};

export const passwordValidationTest = (authenticationData: AuthenticationData) => {
  cy.get('input[name=username]').type(authenticationData.email);
  cy.get('input[name=password]').type('invalid-password');
  cy.get('button').contains('Login').click();
  cy.get('div').contains('Must have 1 uppercase letter');
};
