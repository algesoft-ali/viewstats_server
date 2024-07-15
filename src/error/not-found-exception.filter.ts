import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  NotFoundException,
} from "@nestjs/common";

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const errorResponse = {
      success: false,
      message: "Resource not found",
    };

    response.status(404).json(errorResponse);
  }
}
