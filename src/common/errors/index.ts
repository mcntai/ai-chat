import { HttpException, HttpStatus } from '@nestjs/common';
import * as path from 'path';
import * as assert from 'assert';

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

export class NotFoundError extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND);
  }
}

export const argumentsAssert = (condition, message) => {
  assert(message, 'message is required');

  if (!condition) {
    throw new InvalidArgumentsError(message);
  }
};

export const notFoundAssert = (condition, message) => {
  assert(message, 'message is required');

  if (!condition) {
    throw new NotFoundError(message);
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