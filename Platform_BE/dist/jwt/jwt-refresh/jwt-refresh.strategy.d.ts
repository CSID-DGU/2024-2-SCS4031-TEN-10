import { UsersService } from 'src/modules/users/users.service';
import { Request } from 'express';
import { JwtRefreshPayload } from './jwt-refresh.payload';
declare const JwtRefreshStrategy_base: new (...args: any[]) => any;
export declare class JwtRefreshStrategy extends JwtRefreshStrategy_base {
    private readonly usersService;
    constructor(usersService: UsersService);
    validate(req: Request, payload: JwtRefreshPayload): Promise<import("../../entities/users.entity").Users>;
}
export {};
