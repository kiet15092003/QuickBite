import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { ErrorType } from '../utils/base/error.base';

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

@ObjectType()
export class LoginResponse {
  @Field(() => String, { nullable: true })
  accessToken?: string;

  @Field(() => String, { nullable: true })
  refreshToken?: string;

  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}

@ObjectType()
export class LogoutResponse {
  @Field()
  message: string;
}

@ObjectType()
export class ForgotPasswordResponse {
  @Field()
  message: string;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}

@ObjectType()
export class ResetPasswordResponse {
  @Field(() => User, { nullable: true })
  user: User;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}
