export class ServerNotFoundError extends Error {
  constructor(message: string) {
    super(message);

    this.name = 'ServerNotFoundError';
    this.message = message;
  }
}
