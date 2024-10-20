import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { UsersService } from '../users.service';
import { RegisterResponse } from '../types/user.types';
import { RegisterDto } from '../dto/user.dto';
import { BadRequestException } from '@nestjs/common';
import { User } from '../entities/user.entity';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UsersService) {}
  @Mutation(() => RegisterResponse)
  async register(
    @Args('registerInput') registerDto: RegisterDto,
    @Context() contex: { res: Response },
  ): Promise<RegisterResponse> {
    if (!registerDto.name || !registerDto.email || !registerDto.password) {
      throw new BadRequestException('Please fill the all fields');
    }
    const user = await this.userService.register(registerDto, contex.res);
    return {
      success: true,
      data: user.user,
      error: [],
    };
  }

  @Query(() => [User])
  async getUsers() {
    return this.userService.getUsers();
  }
}
