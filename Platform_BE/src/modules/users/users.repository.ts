import { EntityManager, Repository } from 'typeorm';
import { CustomRepository } from 'src/custom-repository/custom-repository.decorator';
import { Users } from 'src/entities/users.entity';
import { GetFilterUsersDto } from './dto/get-filter-users.dto';
import { DuplicateCheckDto } from './dto/duplicate-check.dto';

@CustomRepository(Users)
export class UsersRepository extends Repository<Users> {
  //* 유저 확인
  async checkUsers(filter?: GetFilterUsersDto): Promise<Users[]> {
    const { user_idx, user_email } = filter;
    const query = this.createQueryBuilder('users');

    if (user_idx || user_idx == 0) {
      query.andWhere('users.user_idx = :user_idx', {
        user_idx,
      });
    }
    if (user_email) {
      query.andWhere('users.user_email = :user_email', {
        user_email,
      });
    }

    return await query.getMany();
  }

  //* 유저 중복 확인
  async duplicateCheck(filter?: DuplicateCheckDto): Promise<Users[]> {
    const { user_email } = filter;

    const query = this.createQueryBuilder('users');

    if (user_email) {
      query.orWhere('users.user_email = :user_email', {
        user_email,
      });
    }

    return await query.getMany();
  }

  //* 리프레쉬 토큰 조회
  async getRefreshToken(user_idx: number): Promise<string> {
    const query = this.createQueryBuilder('users');

    query.where('users.user_idx = :user_idx', {
      user_idx,
    });

    query.select(['users.refresh_token']);

    const result = await query.getOne();
    return result.refresh_token;
  }

  //* 리프레쉬 토큰 업데이트
  async updateRefreshToken(
    user_idx: number,
    refresh_token: string | null,
    manager: EntityManager,
  ): Promise<any> {
    return await manager.update(Users, { user_idx }, { refresh_token });
  }
}
