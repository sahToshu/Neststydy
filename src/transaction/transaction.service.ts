import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Transaction } from './transaction.entity';
import { User } from '../user/user.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { CategoryService } from '../category/category.service';
import { TypeService } from '../type/type.service';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepo: Repository<Transaction>,
    private readonly categoryService: CategoryService,
    private readonly typeService: TypeService,
  ) {}

  async getAll(user: User): Promise<Transaction[]> {
    return this.transactionRepo.find({
      where: { user: { id: user.id } },
      relations: ['type', 'category'],
      order: { date: 'DESC' },
    });
  }

  async filterTransactions(
    user: User,
    filters: {
      date?: Date;
      month?: number;
      year?: number;
      period?: 'day' | 'week' | 'month' | 'year';
    },
  ): Promise<Transaction[]> {
    const where: any = { user: { id: user.id } };

    let startDate: Date | undefined;
    let endDate: Date | undefined;

    if (filters.date) {
      startDate = new Date(filters.date);
      startDate.setHours(0, 0, 0, 0);

      endDate = new Date(filters.date);
      endDate.setHours(23, 59, 59, 999);
    } else if (filters.period === 'week') {
      const today = new Date();
      const dayOfWeek = today.getDay();
      startDate = new Date(today);
      startDate.setDate(today.getDate() - dayOfWeek);
      startDate.setHours(0, 0, 0, 0);

      endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);
      endDate.setHours(23, 59, 59, 999);
    } else if (filters.period === 'month' || filters.month) {
      const year = filters.year || new Date().getFullYear();
      const month = filters.month || new Date().getMonth() + 1;

      startDate = new Date(year, month - 1, 1);
      endDate = new Date(year, month, 0);
      endDate.setHours(23, 59, 59, 999);
    } else if (filters.period === 'year' || filters.year) {
      const year = filters.year || new Date().getFullYear();

      startDate = new Date(year, 0, 1);
      endDate = new Date(year, 11, 31);
      endDate.setHours(23, 59, 59, 999);
    }

    if (startDate && endDate) {
      where.date = Between(startDate, endDate);
    }

    return this.transactionRepo.find({
      where,
      relations: ['type', 'category'],
      order: { date: 'DESC' },
    });
  }
}
