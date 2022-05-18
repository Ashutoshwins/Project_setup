import { Request, Response } from "express";
export default class userController {
    newUser(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllUserDetails(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteUser(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    updateUserData(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    loginUser(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
