import { NextFunction } from "express";
export default class middleware {
    auth(req: any, res: any, next: NextFunction): Promise<any>;
}
