export class HTTPError extends Error {
    status: number;
    message: string;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;
    }
};

export function isHTTPError(error: Error): Boolean {
    return 'status' in error && 'message' in error;
}


