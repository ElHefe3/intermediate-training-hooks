declare namespace Cypress {
  interface Chainable<Subject> {
    login(authenticationData: AuthenticationData): Chainable<Subject>;
  }
}

interface AuthenticationData {
  email: string;
  password: string;
}
