export class ApplicationException extends Error {
  public constructor(message: string = 'An unexpected error ocurred') {
    super(message);
  }
}
