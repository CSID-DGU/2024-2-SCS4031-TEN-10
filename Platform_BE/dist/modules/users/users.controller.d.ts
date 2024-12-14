import { UsersService } from './users.service';
import { SignupUserDto } from './dto/signup-user.dto';
import { SigninUserDto } from './dto/signin-user.dto';
import { GetEmailDuplicateCheckDto } from './dto/get-email-duplicate-check.dto';
import { Response } from 'express';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    signup(signupUserDto: SignupUserDto): Promise<object>;
    signin(signinUserDto: SigninUserDto, res: Response): Promise<object>;
    signout(req: any, res: any): Promise<object>;
    emailDuplicateCheck(getEmailDuplicateCheckDto: GetEmailDuplicateCheckDto): Promise<any>;
    getList(req: any, res: Response): Promise<any>;
}
