import { Request, Response } from "express";
import { checkPassword } from "../hash";
import { UserService } from "../services/UserService";

export class UserController {

    constructor(private userService: UserService) {}

    login = async (req: Request, res: Response) => {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({message: "missing username/password"});
            return;
        }
    
        const admin = await this.userService.getUserByUsername(username);
    
        if(!admin || !(await checkPassword(password, admin.password))) {
            res.status(400).json({message: "invalid username/password"});
            return;
        }
    
        req.session.user = { id: admin.id };
    
        res.json({message: "login success"});
    };

    getLoggedInAdminName = async (req: Request, res: Response) => {
        const adminId = req.session.user?.id as number;
        const admin = await this.userService.getAdminUsername(adminId);
        res.json(admin);
    };
};