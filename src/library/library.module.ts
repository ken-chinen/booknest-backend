import { Module } from '@nestjs/common';
import { LibraryService } from './library.service';
import { LibraryController } from './library.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Library } from './library.entity';
import { Users } from 'src/users/users.entity';
import { UsersLibraryModule } from 'src/users-library/users-library.module';

@Module({
  imports: [TypeOrmModule.forFeature([Library, Users]), UsersLibraryModule],
  controllers: [LibraryController],
  providers: [LibraryService],
})
export class LibraryModule {}
