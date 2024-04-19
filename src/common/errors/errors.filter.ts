import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { HttpStatus, Logger } from '@nestjs/common';
import { APIError, InternalServerError } from 'common/errors';
import { pick } from 'common/utils/object';

const errorLogger = new Logger('ErrorLogger');

@Catch()
export class GlobalErrorFilter implements ExceptionFilter {
  catch(error: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    if (!(error instanceof APIError)) {
      error = new InternalServerError('[UNHANDLED ERROR] ' + JSON.stringify(error?.stack || error));
    }

    errorLogger.error(error?.stack || error);

    if (error instanceof InternalServerError) {
      error.message = InternalServerError.USER_MESSAGE;
    }

    const statusCode = error.getStatus() || HttpStatus.BAD_REQUEST;

    return response.status(statusCode).send({
      statusCode,
      ...pick(error, ['message', 'path', 'key']),
    });
  }
}