import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { ErrorType } from 'public/types/error.types';

@ObjectType()
export class RegisterResponse {
  @Field()
  success: boolean;

  @Field(() => String, { nullable: true })
  activationToken?: string;

  @Field(() => [ErrorType], { nullable: true })
  error?: ErrorType[];
}

@ObjectType()
export class ActivationResponse {
  @Field(() => User)
  user: User | any;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}

// @ObjectType()
// export class LoginResponse extends BaseResponse<User> {}
