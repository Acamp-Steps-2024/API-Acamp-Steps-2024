export class HTTPError extends Error {
  status: number;
  message: string;
  error: any;
  data: any;

  constructor(status: number, message: string, error: any) {
    super();
    this.status = status;
    this.message = message;
    this.error = error;
    this.data = null;
  }
}

export function isHTTPError(error: Error): Boolean {
  return "status" in error && "message" in error;
}
