import { IsOptional, IsString, Length, Matches } from 'class-validator';

export class UpdateLibraryDto {
  @IsOptional()
  @IsString()
  @Length(1, 100)
  name?: string;

  @IsOptional()
  @IsString()
  @Length(1, 200)
  address?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{10,15}$/, {
    message: '電話番号は10〜15桁の数字で入力してください',
  })
  phone?: string;
}
