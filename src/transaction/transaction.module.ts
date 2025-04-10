import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { TransactionService } from './transaction.service';
import { CategoryModule } from '../category/category.module';
import { TypeModule } from '../type/type.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction]),
    CategoryModule,
    TypeModule,
  ],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}
