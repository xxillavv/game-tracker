import { ArgumentsHost, ExceptionFilter, HttpException } from "@nestjs/common";

export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()

    if (exception instanceof HttpException) {
      const status = exception.getStatus()
      return response.status(status).json(exception.getResponse())
    }

    console.error(exception)
    response.status(500).json({
      statusCode: 500,
      message: "Internal server error"
    })
  }
}