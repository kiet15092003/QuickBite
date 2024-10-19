import { Field, ObjectType } from '@nestjs/graphql';
import { ErrorType } from 'public/types/error.types';

@ObjectType()
export class BaseResponse<T> {
  @Field()
  success: boolean;

  @Field(() => Object, { nullable: true })
  data?: T;

  @Field(() => [ErrorType], { nullable: true })
  error?: ErrorType[];
}
