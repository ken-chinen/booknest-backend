import {
  IsString,
  IsEnum,
  IsEmail,
  Length,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { UserRole } from 'src/library/users-enum';

export class CreateUsersDto {
  @IsOptional()
  @IsUUID()
  libraryId?: string;

  @IsString()
  @Length(1, 100)
  name: string;

  @IsEmail()
  @Length(5, 255)
  email: string;

  @IsString()
  @Length(8, 100)
  password: string;

  @IsEnum(UserRole)
  role: UserRole;
}
