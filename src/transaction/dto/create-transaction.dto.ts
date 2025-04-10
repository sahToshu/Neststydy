import {
  IsNotEmpty,
  IsNumber,
  IsDateString,
  IsPositive,
} from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  typeId: number;

  @IsNotEmpty()
  categoryId: number;

  @IsNumber()
  @IsPositive()
  value: number;

  @IsDateString()
  date?: string;
}
