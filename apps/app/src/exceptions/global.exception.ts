import { logger } from '@esign-services/logger'
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost): void {
    let responseBody: unknown
    const { httpAdapter } = this.httpAdapterHost
    const ctx = host.switchToHttp()

    const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR


    // Response for controlled exception
    if (exception instanceof HttpException) {
      responseBody = exception.getResponse()
      logger.error(responseBody)
    }

    // Response for unhandled exception
    if (httpStatus === HttpStatus.INTERNAL_SERVER_ERROR) {
      responseBody = {
        code: httpStatus,
        info: 'FAIL',
        message: exception.response || 'Internal Server Error'
      }
      logger.error(exception)
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus)
  }
}
