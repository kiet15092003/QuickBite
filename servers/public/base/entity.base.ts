import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BaseEntity {
  @Field()
  id: number;

  @Field()
  createdAt: Date;

  @Field(() => String, { nullable: true })
  updatedAt?: Date;

  constructor() {
    this.createdAt = new Date();
  }
}
