import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/User.model';
import { Task } from './models/Task.model';
import { SharedTask } from './models/SharedTask.model';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import { MainResolver } from './MainResolver';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        path.join(__dirname, '../dist/**/**.model{.ts,.js}'),
        path.join(__dirname, './**/**.model{.ts,.js}'),
      ],
      synchronize: true,
    }),
    UsersModule,
    TasksModule,
  ],
  controllers: [],
  providers: [MainResolver],
})
export class AppModule {}
