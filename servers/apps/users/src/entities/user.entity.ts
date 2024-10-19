import { Directive, Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'public/base/entity.base';

@ObjectType()
@Directive('@key(fields: "id")')
export class Avatars extends BaseEntity {
  @Field()
  public_id: string;
  @Field()
  url: string;
  @Field()
  userId: string;
}

@ObjectType()
export class User extends BaseEntity {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field(() => Avatars, { nullable: true })
  avatar?: Avatars | null;

  @Field()
  role: string;
}
