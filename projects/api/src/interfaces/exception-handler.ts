import { Response } from "express";

export type IExceptionOptionsMake = {
  error: any;
};

export interface IExceptionHandler {
  make(res: Response, options: IExceptionOptionsMake): Response;
}
