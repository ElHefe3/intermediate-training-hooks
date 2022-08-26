export class ClientNetworkError extends Error {
  errors: any;
  statusCode: number;

  constructor(statusCode: number, error: any) {
    super(error);

    this.name = 'ClientNetworkError';
    this.message = error?.error || `Request failed with status code ${statusCode}`;
    this.errors = error?.errors;
    this.statusCode = statusCode;
  }
}
