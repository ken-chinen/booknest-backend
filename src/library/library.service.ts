import { Injectable, NotFoundException } from '@nestjs/common';
import { Library } from './library.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateLibraryDto } from '../dtos/library/create-library.dto';
import { UpdateLibraryDto } from '../dtos/library/update-library.dto';
import * as path from 'path';
import * as fs from 'fs';
import { Users } from 'src/users/users.entity';
import { UsersLibrary } from 'src/users-library/users-library.entity';

@Injectable()
export class LibraryService {
  constructor(
    @InjectRepository(Library)
    private readonly libraryRepository: Repository<Library>,
    @InjectRepository(UsersLibrary)
    private readonly usersLibraryRepository: Repository<UsersLibrary>,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async bulkInsertFromJson(): Promise<string> {
    const filePath = path.join(
      __dirname,
      '../../src/seed/library_sample_data_realistic.json',
    );
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const libraries = JSON.parse(jsonData) as CreateLibraryDto[];

    await this.libraryRepository.save(libraries);
    return `${libraries.length} 件のデータをインサートしました`;
  }

  async findAll(): Promise<Library[]> {
    return this.libraryRepository.find();
  }

  async findById(id: string): Promise<Library> {
    const library = await this.libraryRepository.findOneBy({ id });
    if (!library) {
      throw new NotFoundException({ message: '図書館はありません' });
    }
    return library;
  }

  async create(createLibraryDto: CreateLibraryDto): Promise<Library> {
    const { userIds, ...libraryData } = createLibraryDto;

    // 図書館エンティティの作成・保存
    const library = this.libraryRepository.create(libraryData);
    const savedLibrary = await this.libraryRepository.save(library);

    //userIdsが存在する場合、中間テーブルにレコードを保存
    if (userIds) {
      const users = await this.usersRepository.find({
        where: { id: In(userIds) },
      });

      const usersLibraryEntities = users.map((user) =>
        this.usersLibraryRepository.create({
          user,
          library: savedLibrary,
        }),
      );
      await this.usersLibraryRepository.save(usersLibraryEntities);
    }

    return savedLibrary;
  }

  async update(
    id: string,
    updateLibraryDto: UpdateLibraryDto,
  ): Promise<Library> {
    const library = await this.libraryRepository.findOneBy({ id });
    if (!library) {
      throw new NotFoundException({ message: '図書館はありません' });
    }
    Object.assign(library, updateLibraryDto);
    return this.libraryRepository.save(library);
  }

  async remove(id: string): Promise<void> {
    const library = await this.libraryRepository.findOneBy({ id });
    if (!library) {
      throw new NotFoundException({ message: '図書館はありません' });
    }
    await this.libraryRepository.remove(library);
  }
}
