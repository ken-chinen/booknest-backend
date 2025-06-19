import { Injectable, NotFoundException } from '@nestjs/common';
import { Library } from './library.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLibraryDto } from './dtos/create-library.dto';
import { UpdateLibraryDto } from './dtos/update-library.dto';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class LibraryService {
  constructor(
    @InjectRepository(Library)
    private readonly libraryRepository: Repository<Library>,
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
    return this.libraryRepository.save(createLibraryDto);
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
