/**
 * Error class for fun-km errors
 */
export class KmError extends Error {
  name: string;
  cause: Error | undefined;
  message: string;
  constructor(message: string, error?: Error) {
    super(message);
    this.name = 'KmError';
    this.message = message;
    this.cause = error;
  }
}
