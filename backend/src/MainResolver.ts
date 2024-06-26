import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class MainResolver {
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
