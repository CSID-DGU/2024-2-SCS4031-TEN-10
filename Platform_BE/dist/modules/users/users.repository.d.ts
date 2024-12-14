import { EntityManager, Repository } from 'typeorm';
import { Users } from 'src/entities/users.entity';
import { GetFilterUsersDto } from './dto/get-filter-users.dto';
import { DuplicateCheckDto } from './dto/duplicate-check.dto';
export declare class UsersRepository extends Repository<Users> {
    checkUsers(filter?: GetFilterUsersDto): Promise<Users[]>;
    duplicateCheck(filter?: DuplicateCheckDto): Promise<Users[]>;
    getRefreshToken(user_idx: number): Promise<string>;
    updateRefreshToken(user_idx: number, refresh_token: string | null, manager: EntityManager): Promise<any>;
}
