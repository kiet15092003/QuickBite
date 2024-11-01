import { ObjectType, Field } from "@nestjs/graphql";
import { Restaurant } from "../entities/restaurant.entities";
import { ErrorType } from "../utils/base/error.base";

@ObjectType()
export class RegisterResponse {
  @Field()
  message: string;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}

@ObjectType()
export class ActivationResponse {
  @Field(() => Restaurant)
  restaurant: Restaurant | unknown;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}

@ObjectType()
export class LoginResponse {
  @Field(() => Restaurant, { nullable: true })
  restaurant?: Restaurant | any;

  @Field({ nullable: true })
  accessToken?: string;

  @Field({ nullable: true })
  refreshToken?: string;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}

@ObjectType()
export class LogoutResposne {
  @Field()
  message?: string;
}


