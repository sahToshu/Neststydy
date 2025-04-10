import { DataSource } from 'typeorm';
import { Type, TransactionType } from './type.entity';

export const seedTypes = async (dataSource: DataSource) => {
  const repo = dataSource.getRepository(Type);
  const exists = await repo.find();

  if (exists.length === 0) {
    await repo.insert([
      { name: TransactionType.INCOME },
      { name: TransactionType.EXPENSE },
    ]);
    console.log('Типи транзакцій ініціалізовано!');
  }
};
