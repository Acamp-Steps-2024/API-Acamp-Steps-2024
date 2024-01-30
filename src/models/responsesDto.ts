import { Request } from "express";

export class ResponseDto {
    constructor(public message: String, public data: any) {
    }
}