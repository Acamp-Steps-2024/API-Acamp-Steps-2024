import { Request, Response, NextFunction } from "express";
import { ResponseDto } from "./ResponseDto";

export interface ResponseInterface extends Response {
  apiSuccess: (response: ResponseDto) => void;
  apiFailure: (response: ResponseDto) => void;
}

export function responseMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const customRes: ResponseInterface = res as ResponseInterface;

  customRes.apiSuccess = (response: ResponseDto) => {
    customRes
      .status(response.statusCode)
      .json({ message: response.message, data: response.data });
  };

  customRes.apiFailure = (response: ResponseDto) => {
    customRes
      .status(response.statusCode)
      .json({ message: response.message, error: response.error, data: null });
  };

  next();
}