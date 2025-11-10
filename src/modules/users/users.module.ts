import { Module } from '@nestjs/common';
import { UsersRepository } from './infrastructure/repositories/users.repositories';
import { UsersController } from './interfaces/controllers/users.controller';

@Module({
  providers: [UsersRepository],
  controllers: [UsersController],
  exports:[UsersRepository],
})
export class UsersModule {};