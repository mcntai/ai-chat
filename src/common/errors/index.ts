import { HttpException, HttpStatus } from '@nestjs/common';
import * as path from 'path';

export class APIError extends HttpException {
  constructor(message: string, statusCode: number) {
    super(message, statusCode);
  }

  toJSON() {
    return { message: this.message, ...this };
  }
}

export class ValidationError extends APIError {
  public path: string;
  public key: string;
  public value: any;
  public payload: any;
  public statusCode: number;

  constructor(message, details: any = {}) {
    super(message, HttpStatus.BAD_REQUEST);

    this.path = details.path;
    this.key = details.key;
    this.value = details.value;
    this.payload = details.payload;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      path:       this.path,
      statusCode: this.statusCode,
    };
  }
}

export class InvalidArgumentsError extends HttpException {
  constructor(message) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

export class InternalServerError extends HttpException {
  public static USER_MESSAGE: string;

  constructor(message: string) {
    super(message || InternalServerError.USER_MESSAGE, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class UnAuthorizedError extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}

export class IntegrationError extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export const argumentsAssert = (condition, message) => {
  if (!message) {
    throw new Error('message is required');
  }

  if (!condition) {
    throw new InvalidArgumentsError(message);
  }
};

InternalServerError.USER_MESSAGE = 'Internal Server Error';

export const stringifyStack = (error: any) => {
  if (error instanceof Error) {
    const [firstLine, ...restLines] = error.stack.split('\n');

    const rootPath = path.resolve(__dirname, '../..');

    const stack = restLines.map(line => line.replace(rootPath, '').trim());

    return firstLine + '. ' + JSON.stringify({ stack });
  }

  const result = error.message || error;

  return typeof result === 'string'
    ? result
    : JSON.stringify(result);
};