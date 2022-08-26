export class ServerNetworkError extends Error {
  errors: any;
  statusCode: number;

  constructor(statusCode: number, error: any) {
    super(error);

    this.name = 'ServerNetworkError';
    this.message = error?.error ?? `Request failed with status code ${statusCode}`;
    this.errors = error?.errors;
    this.statusCode = statusCode;
  }
}
