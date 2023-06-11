import { HttpException, HttpStatus } from '@nestjs/common'

export class UnauthorizedException extends HttpException {
  constructor(msg?: unknown) {
    super({ code: HttpStatus.UNAUTHORIZED, message: msg || 'Unauthorized' }, HttpStatus.UNAUTHORIZED)
  }
}

export class ExceptionConflict extends HttpException {
  constructor(msg?: unknown) {
    super({ code: HttpStatus.CONFLICT, message: msg || 'Already exists' }, HttpStatus.CONFLICT)
  }
}

export class ExceptionNotFound extends HttpException {
  constructor(msg?: unknown) {
    super({ message: msg || 'Not found' }, HttpStatus.NOT_FOUND)
  }
}

export class ExceptionBadRequest extends HttpException {
  constructor(msg?: unknown) {
    super({ code: HttpStatus.BAD_REQUEST, message: msg || 'Bad request' }, HttpStatus.BAD_REQUEST)
  }
}

export class ExceptionUnauthorized extends HttpException {
  constructor(msg?: unknown) {
    super({ code: HttpStatus.UNAUTHORIZED, message: msg || 'Unauthorized' }, HttpStatus.UNAUTHORIZED)
  }
}

export class ExceptionForbidden extends HttpException {
  constructor(msg?: unknown) {
    super({ code: HttpStatus.FORBIDDEN, message: msg || 'Forbidden' }, HttpStatus.FORBIDDEN)
  }
}
