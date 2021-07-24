import { IsEnum, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class AddBalanceDTO {
  @IsNotEmpty()
  @IsNumber()
  value: Number;
}