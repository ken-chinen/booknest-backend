import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { LibraryService } from './library.service';
import { CreateLibraryDto } from './dtos/create-library.dto';
import { UpdateLibraryDto } from './dtos/update-library.dto';
import { Library } from './library.entity';

@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @Get('seed')
  seedLibraries(): Promise<string> {
    return this.libraryService.bulkInsertFromJson();
  }

  @Get()
  findALL(): Promise<Library[]> {
    return this.libraryService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Library> {
    return this.libraryService.findById(id);
  }

  @Post()
  async create(@Body() createLibraryDto: CreateLibraryDto): Promise<Library> {
    return this.libraryService.create(createLibraryDto);
  }
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateLibraryDto: UpdateLibraryDto,
  ): Promise<Library> {
    return this.libraryService.update(id, updateLibraryDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.libraryService.remove(id);
  }
}
