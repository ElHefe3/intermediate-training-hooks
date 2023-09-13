export const authenticationData: AuthenticationData = {
  email: Cypress.env('username') as string,
  password: Cypress.env('password') as string,
};
