import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UsersService } from '../users.service';
import { RegisterResponse } from '../types/user.types';
import { RegisterDto } from '../dto/user.dto';
import { BadRequestException } from '@nestjs/common';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UsersService) {}
  @Mutation(() => RegisterResponse)
  async register(
    @Args('registerInput') registerDto: RegisterDto,
  ): Promise<RegisterResponse> {
    if (!registerDto.name || !registerDto.email || !registerDto.password) {
      throw new BadRequestException('Please fill the all fields');
    }
    const user = await this.userService.Register(registerDto);
    return {
      success: true,
      data: user,
      error: [],
    };
  }
}
