import { HttpStatus } from '@nestjs/common';

const NOT_FOUND_RESPONSE = {
  description: 'Resource not found',
  schema:      {
    type:       'object',
    properties: {
      statusCode: { type: 'number', default: HttpStatus.NOT_FOUND },
      message:    { type: 'string' },
    },
  },
};

const BAD_REQUEST_RESPONSE = {
  description: 'Invalid input',
  schema:      {
    type:       'object',
    properties: {
      statusCode: { type: 'number', default: HttpStatus.BAD_REQUEST },
      message:    { type: 'string' },
    },
  },
};

export const RESPONSE_OPTIONS = {
  NOT_FOUND:            NOT_FOUND_RESPONSE,
  NOT_FOUND_BY_CHAT_ID: {
    ...NOT_FOUND_RESPONSE,
    description: 'When chatId provided but it does not exist',
  },
  BAD_REQUEST:          BAD_REQUEST_RESPONSE,
  NO_BALANCE:           {
    ...BAD_REQUEST_RESPONSE,
    description: 'User has no balance',
  },
  UNPROCESSABLE_ENTITY: {
    description: 'Invalid file format or size',
    schema:      {
      type:       'object',
      properties: {
        statusCode: { type: 'number', default: HttpStatus.UNPROCESSABLE_ENTITY },
        message:    { type: 'string' },
      },
    },
  },
  STREAM: {
    description: 'Stream of text',
    headers:     {
      'Transfer-Encoding': {
        description: 'chunked',
        schema:      { type: 'string' },
      },
    },
  },
};

export const REQUEST_HEADERS = {
  AUTHORIZATION: {
    name:        'Authorization',
    description: 'Bearer accessToken',
    required:    true,
  },
};