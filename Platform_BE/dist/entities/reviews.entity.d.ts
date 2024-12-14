import { Users } from './users.entity';
export declare class Reviews {
    constructor(partial: Partial<Reviews>);
    review_idx: number;
    review_content: string;
    festival_idx: number;
    create_date: Date;
    users: Users;
}
