import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class CreateLibraryDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 200)
  address: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{10,15}$/, {
    message: '電話番号は10〜15桁の数字で入力してください',
  })
  phone: string;
}
