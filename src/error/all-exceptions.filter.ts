import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import config from "config";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    // ----- initial variables
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = "Internal server error" as any;
    let stack = null;
    let errors = null;

    // ----- Handle BadRequestException
    if (exception instanceof BadRequestException) {
      status = HttpStatus.BAD_REQUEST;
      message = (exception.getResponse() as any)?.error;
      errors = (exception.getResponse() as any)?.message;
      stack = exception.stack;

      // ----- Handle NotFoundException
    } else if (exception instanceof NotFoundException) {
      status = exception.getStatus();
      message = "Resource Not Found!";
      stack = exception.stack;

      // ----- Handle UnauthorizedException
    } else if (exception instanceof UnauthorizedException) {
      status = exception.getStatus();
      message = exception.getResponse();
      stack = exception.stack;

      // ----- Handle HttpException
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse();
      stack = exception.stack;

      // ----- Handle Error
    } else if (exception instanceof Error) {
      message = exception.message;
      stack = exception.stack;
    }

    const errorResponse = {
      success: false,
      message,
      errors: errors || undefined,
      stack: config.isDevelopment && stack ? stack : undefined,
    };

    response.status(status).json(errorResponse);
  }
}
