import { ExceptionFilter, Catch, HttpException, ArgumentsHost, InternalServerErrorException } from '@nestjs/common';
import { HttpStatus, Logger } from '@nestjs/common';

const errorLogger = new Logger('ErrorLogger');

@Catch()
export class GlobalErrorFilter implements ExceptionFilter {
  catch(error: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    errorLogger.error(error?.stack || error);

    let statusCode;

    if (error instanceof HttpException) {
      statusCode = error.getStatus();
      error = error.getResponse();
    } else {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      error = new InternalServerErrorException();
    }

    return response.status(statusCode).send(error);
  }
}