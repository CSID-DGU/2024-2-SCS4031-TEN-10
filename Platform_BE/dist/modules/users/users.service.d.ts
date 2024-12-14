import { DataSource } from 'typeorm';
import { UsersRepository } from './users.repository';
import { SignupUserDto } from './dto/signup-user.dto';
import { Users } from 'src/entities/users.entity';
import { SigninUserDto } from './dto/signin-user.dto';
import { DuplicateCheckDto } from './dto/duplicate-check.dto';
import { GetFilterUsersDto } from './dto/get-filter-users.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtRefreshPayload } from 'src/jwt/jwt-refresh/jwt-refresh.payload';
export declare class UsersService {
    private readonly usersRepository;
    private readonly jwtService;
    private readonly configService;
    private readonly dataSource;
    constructor(usersRepository: UsersRepository, jwtService: JwtService, configService: ConfigService, dataSource: DataSource);
    checkUsers(filter: GetFilterUsersDto): Promise<Users[]>;
    duplicateCheck(filter?: DuplicateCheckDto): Promise<Users[]>;
    signUp(signupUserDto: SignupUserDto): Promise<string>;
    signIn(signinUserDto: SigninUserDto, user: Users): Promise<any>;
    signOut(user_idx: number): Promise<any>;
    decodeRefreshToken(refreshToken: string): Promise<Users>;
    refreshAccessToken(refreshToken: string): Promise<string>;
    getUserIfRefreshTokenMatches(refreshToken: string, userIdx: number): Promise<Users>;
    generateAccessToken(payload: JwtRefreshPayload): Promise<string>;
    generateRefreshToken(user_idx: number): Promise<string>;
}
