import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsersDto } from '../dtos/user/create-users.dto';
import { Users } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UpdateUsersDto } from '../dtos/user/update-users.dto';
import { UsersLibrary } from 'src/users-library/users-library.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @InjectRepository(UsersLibrary)
    private readonly usersLibraryRepository: Repository<UsersLibrary>,
  ) {}

  async findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  async findById(id: string): Promise<Users> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('ユーザーが見つかりません');
    }
    return user;
  }

  async createUser(createUsersDto: CreateUsersDto): Promise<Users> {
    const { password, libraryId, ...res } = createUsersDto;
    const passwordHash = await bcrypt.hash(password, 10);

    //ユーザー作成
    const user = this.usersRepository.create({
      ...res,
      passwordHash,
      usersLibrary: libraryId ? ({ id: libraryId } as any) : undefined,
    });
    const savedUser = await this.usersRepository.save(user);

    //UsersLibraryの作成
    if (libraryId) {
      const userLibrary = this.usersLibraryRepository.create({
        user: savedUser,
        library: { id: libraryId } as any,
      });
      await this.usersLibraryRepository.save(userLibrary);
    }
    return savedUser;
  }

  async updateUser(id: string, updateUsersDto: UpdateUsersDto): Promise<Users> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('ユーザーが見つかりません');
    }

    if (updateUsersDto.currentPassword && updateUsersDto.newPassword) {
      const isMatch = await bcrypt.compare(
        updateUsersDto.currentPassword,
        user.passwordHash,
      );
      if (!isMatch) {
        throw new NotFoundException('現在のパスワードが一致しません');
      }

      user.passwordHash = await bcrypt.hash(updateUsersDto.newPassword, 10);
    }

    delete updateUsersDto.currentPassword;
    delete updateUsersDto.newPassword;
    Object.assign(user, updateUsersDto);

    const savedUser = this.usersRepository.save(user);
    return savedUser;
  }

  async deleteUser(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('ユーザーが見つかりません');
    }
    await this.usersRepository.remove(user);
  }
}
