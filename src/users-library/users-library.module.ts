import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersLibrary } from './users-library.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersLibrary])],
  exports: [TypeOrmModule],
})
export class UsersLibraryModule {}
