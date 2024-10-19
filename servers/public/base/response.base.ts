import { Field, ObjectType } from '@nestjs/graphql';
import { ErrorType } from 'public/types/error.types';

@ObjectType()
export class BaseResponse {
  @Field()
  success: boolean;

  @Field(() => Object, { nullable: true })
  data?: any;

  @Field(() => [ErrorType], { nullable: true })
  error?: ErrorType[];
}
