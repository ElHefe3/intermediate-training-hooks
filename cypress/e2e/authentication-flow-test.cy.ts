import { authenticationData } from '../helpers';
import {
  forgotPasswordTest,
  invalidEmailTest,
  loginTest,
  passwordValidationTest,
  registerTest,
} from './authentication-tests';

describe('Authentication tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Login', () => {
    loginTest(authenticationData);
  });

  it('Invalid login credentials', () => {
    invalidEmailTest(authenticationData);
  });

  it('Password validation', () => {
    passwordValidationTest(authenticationData);
  });

  it('Register', () => {
    registerTest(authenticationData);
  });

  it('Forgot Password', () => {
    forgotPasswordTest(authenticationData);
  });
});
