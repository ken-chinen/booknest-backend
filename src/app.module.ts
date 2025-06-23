import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibraryModule } from './library/library.module';
import { UsersModule } from './users/users.module';
import { UsersLibraryModule } from './users-library/users-library.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'dev',
      password: 'devpass',
      database: 'booknest',
      autoLoadEntities: true,
      synchronize: true, //本番ではfalseにする
    }),
    LibraryModule,
    UsersModule,
    UsersLibraryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
