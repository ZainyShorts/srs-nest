import { UserService } from './user.service';
import { Response } from 'express';
export declare class UserController {
    private authService;
    constructor(authService: UserService);
    login(body: any, res: Response): Promise<{
        success: boolean;
        message: string;
        id: unknown;
    }>;
}
