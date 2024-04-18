import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidArgumentsError extends HttpException {
  constructor(message) {
    super({
      statusCode: HttpStatus.BAD_REQUEST,
      message,
    }, HttpStatus.BAD_REQUEST);
  }
}

export class InternalServerError extends HttpException {
  constructor(message: string) {
    super({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message,
    }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class UnAuthorizedError extends HttpException {
  constructor(message: string) {
    super({
      statusCode: HttpStatus.UNAUTHORIZED,
      message,
    }, HttpStatus.UNAUTHORIZED);
  }
}

export class IntegrationError extends HttpException {
  constructor(message: string) {
    super({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message,
    }, HttpStatus.INTERNAL_SERVER_ERROR);
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