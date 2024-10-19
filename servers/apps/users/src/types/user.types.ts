import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { ErrorType } from 'public/types/error.types';

@ObjectType()
export class RegisterResponse {
  @Field()
  success: boolean;

  @Field(() => User, { nullable: true })
  data?: User;

  @Field(() => [ErrorType], { nullable: true })
  error?: ErrorType[];
}

// @ObjectType()
// export class LoginResponse extends BaseResponse<User> {}
