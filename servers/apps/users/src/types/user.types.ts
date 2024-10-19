import { ObjectType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { BaseResponse } from 'public/base/response.base';

@ObjectType()
export class RegisterResponse extends BaseResponse<User> {}

@ObjectType()
export class LoginResponse extends BaseResponse<User> {}
