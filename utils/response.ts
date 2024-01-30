/**
 * @description 状态码
 */
export enum KmResponseCode {
  SUCCESS = 200,
  ERROR = 500,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  FORBIDDEN = 403,
  BAD_REQUEST = 400,
}

/**
 * @description 状态说明
 */
export enum KmResponseMessage {
  SUCCESS = 'success',
  ERROR = 'error',
  UNAUTHORIZED = 'unauthorized',
  NOT_FOUND = 'not found',
  FORBIDDEN = 'forbidden',
  BAD_REQUEST = 'bad request',
}

/**
 * @description: 响应对象
 */
export class KmResponse<T> {
  statusCode: number;
  statusMessage: string;
  data?: T;
  error?: Error;

  constructor(statusCode: number, statusMessage: string, data?: T, error?: Error) {
    this.statusCode = statusCode;
    this.statusMessage = statusMessage;
    this.data = data;
    this.error = error;
  }

  static success<T>(data?: T): KmResponse<T> {
    return new KmResponse<T>(KmResponseCode.SUCCESS, KmResponseMessage.SUCCESS, data);
  }

  static error<T>(error: Error): KmResponse<T> {
    return new KmResponse<T>(KmResponseCode.ERROR, KmResponseMessage.ERROR, undefined, error);
  }

  static unauthorized<T>(error: Error): KmResponse<T> {
    return new KmResponse<T>(KmResponseCode.UNAUTHORIZED, KmResponseMessage.UNAUTHORIZED, undefined, error);
  }

  static notFound<T>(error: Error): KmResponse<T> {
    return new KmResponse<T>(KmResponseCode.NOT_FOUND, KmResponseMessage.NOT_FOUND, undefined, error);
  }

  static forbidden<T>(error: Error): KmResponse<T> {
    return new KmResponse<T>(KmResponseCode.FORBIDDEN, KmResponseMessage.FORBIDDEN, undefined, error);
  }

  static badRequest<T>(error: Error): KmResponse<T> {
    return new KmResponse<T>(KmResponseCode.BAD_REQUEST, KmResponseMessage.BAD_REQUEST, undefined, error);
  }

  static custom<T>(statusCode: number, statusMessage: string, data?: T, error?: Error): KmResponse<T> {
    return new KmResponse<T>(statusCode, statusMessage, data, error);
  }
}
