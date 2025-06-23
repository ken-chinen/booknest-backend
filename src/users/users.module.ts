import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { UsersLibraryModule } from 'src/users-library/users-library.module';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), UsersLibraryModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
