export declare class Users {
    constructor(partial: Partial<Users>);
    user_idx: number;
    user_email: string;
    user_password: string;
    salt: string;
    refresh_token: string;
}
