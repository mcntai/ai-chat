import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common';

export class InvalidArgumentsError extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
    this.name = 'InvalidArgumentsError';
  }
}

export class NotFoundError extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND);
    this.name = 'NotFoundError';
  }
}

export class InternalServerError extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
    this.name = 'InternalServerError';
  }
}

export class UnAuthorizedError extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.UNAUTHORIZED);
    this.name = 'UnAuthorizedError';
  }
}

export const argumentsAssert = (value, message) => {
  if (!value) {
    throw new InvalidArgumentsError(message);
  }
};

export const notFoundAssert = (value, message) => {
  if (!value) {
    throw new NotFoundError(message);
  }
};