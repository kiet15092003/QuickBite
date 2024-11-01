import { ObjectType, Field, Directive } from '@nestjs/graphql';
import { BaseEntity } from '../utils/base/entity.base';

@ObjectType()
@Directive('@key(fields:"id")')
export class Avatars extends BaseEntity {
  @Field()
  public_id: string;

  @Field()
  url: string;

  @Field()
  restaurantId: number;
}

@ObjectType()
export class Restaurant extends BaseEntity {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field(() => Avatars, { nullable: true })
  avatar?: Avatars | null;

  @Field()
  phoneNumber: string;

  @Field()
  password: string;

  @Field()
  role: string;
}
