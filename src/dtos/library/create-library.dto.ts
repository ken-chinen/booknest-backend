import {
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Matches,
} from 'class-validator';

export class CreateLibraryDto {
  @IsString()
  @Length(1, 100)
  name: string;

  @IsString()
  @Length(1, 200)
  address: string;

  @IsString()
  @Matches(/^\d{10,15}$/, {
    message: '電話番号は10〜15桁の数字で入力してください',
  })
  phone: string;

  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  userIds?: string[];
}
