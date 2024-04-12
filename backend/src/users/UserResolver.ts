import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from 'src/models/User.model';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UsersService) {}

  @Query((returns) => [User])
  async getAllUsers() {
    return await this.userService.findAll();
  }

  @Query((returns) => User)
  async getUserById(@Args('id', { type: () => Int }) id: number) {
    return await this.userService.findById(id);
  }

  @Mutation((returns) => User)
  async createUser(
    @Args('googleId') googleId: string,
    @Args('displayName') displayName: string,
    @Args('email') email: string,
  ) {
    return await this.userService.createUser(googleId, displayName, email);
  }

  @Mutation((returns) => User)
  async updateUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('googleId') googleId: string,
    @Args('displayName') displayName: string,
    @Args('email') email: string,
  ) {
    return await this.userService.updateUser(id, googleId, displayName, email);
  }
}
