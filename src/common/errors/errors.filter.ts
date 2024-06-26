import { ExceptionFilter, Catch, HttpException, ArgumentsHost } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { InternalServerError, stringifyStack } from 'common/errors';

const errorLogger = new Logger('ErrorLogger');

@Catch()
export class GlobalErrorFilter implements ExceptionFilter {
  catch(error: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    if (!(error instanceof HttpException)) {
      error = new InternalServerError('[UNHANDLED ERROR] ' + stringifyStack(error));
    }

    errorLogger.error(
      `${request.method} ${request.url}:`
      + ` ${error.name}:`
      + ` ${error.getResponse().message || error.message}`,
    );

    if (error instanceof InternalServerError) {
      error = new InternalServerError(InternalServerError.USER_MESSAGE);
    }

    const statusCode = error.getStatus();

    error = error.getResponse();

    return response.status(statusCode).send({
      statusCode,
      message: error.message || error,
    });
  }
}