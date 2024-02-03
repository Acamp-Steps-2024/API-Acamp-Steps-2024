import { StatusCodes } from "http-status-codes";

export class ResponseDto {
  message: string;
  statusCode: StatusCodes;
  error?: any;
  data?: any;

  constructor(
    message: string,
    data?: any,
    statusCode: StatusCodes = StatusCodes.OK,
    error?: any
  ) {
    this.message = message;
    this.data = data;
    this.statusCode = statusCode;
    this.error = error;
  }
}
