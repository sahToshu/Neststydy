import { ApiProperty } from '@nestjs/swagger';
import { TransactionType } from '../type.entity';

export class TypeDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: TransactionType.INCOME, enum: TransactionType })
  name: TransactionType;
}
