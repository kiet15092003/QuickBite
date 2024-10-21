import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { UsersService } from '../users.service';
import {
  ActivationResponse,
  LoginResponse,
  RegisterResponse,
} from '../types/user.types';
import { ActivationDto, LoginDto, RegisterDto } from '../dto/user.dto';
import { BadRequestException } from '@nestjs/common';
import { User } from '../entities/user.entity';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UsersService) {}

  @Mutation(() => RegisterResponse)
  async register(
    @Args('registerDto') registerDto: RegisterDto,
    @Context() contex: { res: Response },
  ): Promise<RegisterResponse> {
    if (!registerDto.name || !registerDto.email || !registerDto.password) {
      throw new BadRequestException('Please fill the all fields');
    }
    const { activationToken } = await this.userService.register(
      registerDto,
      contex.res,
    );
    return {
      success: true,
      activationToken: activationToken.token,
    };
  }

  @Mutation(() => ActivationResponse)
  async activateUser(
    @Args('activationDto') activationDto: ActivationDto,
    @Context() context: { res: Response },
  ): Promise<ActivationResponse> {
    return await this.userService.activateUser(activationDto, context.res);
  }

  @Mutation(() => LoginResponse)
  async login(
    @Args('loginDto') loginDto: LoginDto,
    @Context() context: { res: Response },
  ): Promise<LoginResponse> {
    return await this.userService.login(loginDto, context.res);
  }

  @Query(() => [User])
  async getUsers() {
    return this.userService.getUsers();
  }
}
