import { IsString, IsEnum, IsEmail, Length, IsOptional } from 'class-validator';
import { UserRole } from 'src/library/users-enum';

export class UpdateUsersDto {
  @IsOptional()
  @IsString()
  @Length(1, 100)
  name?: string;

  @IsOptional()
  @IsEmail()
  @Length(5, 255)
  email?: string;

  @IsOptional()
  @IsString()
  currentPassword?: string;

  @IsOptional()
  @IsString()
  @Length(8, 100)
  newPassword?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
