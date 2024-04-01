import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidArgumentsError extends HttpException {
  constructor(message) {
    super({
      statusCode: HttpStatus.BAD_REQUEST,
      message,
      error:      'Bad Request',
    }, HttpStatus.BAD_REQUEST);
  }
}

export class BusinessError extends HttpException {
  constructor(message) {
    super({
      statusCode: HttpStatus.BAD_REQUEST,
      message,
      error:      'Bad Request',
    }, HttpStatus.BAD_REQUEST);
  }
}

export class InternalServerError extends HttpException {
  constructor(message: string) {
    super({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message,
      error:      'Internal Server Error',
    }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class UnAuthorizedError extends HttpException {
  constructor(message: string) {
    super({
      statusCode: HttpStatus.UNAUTHORIZED,
      message,
      error:      'Unauthorized',
    }, HttpStatus.UNAUTHORIZED);
  }
}

export class IntegrationError extends HttpException {
  constructor(message: string) {
    super({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message,
      error:      'Integration Error',
    }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class NotFoundError extends HttpException {
  constructor(message) {
    super({
      statusCode: HttpStatus.NOT_FOUND,
      message,
      error:      'Not Found',
    }, HttpStatus.NOT_FOUND);
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

export const businessAssert = (condition, message) => {
  if (!message) {
    throw new Error('message is required');
  }

  if (!condition) {
    throw new BusinessError(message);
  }
};

export const notFoundAssert = (condition, message) => {
  if (!condition) {
    throw new NotFoundError(message || 'Unable to find entity');
  }
};