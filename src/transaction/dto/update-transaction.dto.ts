import {
  IsOptional,
  IsNumber,
  IsDateString,
  IsPositive,
} from 'class-validator';

export class UpdateTransactionDto {
  @IsOptional()
  typeId?: number;

  @IsOptional()
  categoryId?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  value?: number;

  @IsOptional()
  @IsDateString()
  date?: string;
}
