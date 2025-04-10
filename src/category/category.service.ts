import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { User } from '../user/user.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {}

  async create(createDto: CreateCategoryDto, user: User): Promise<Category> {
    const category = this.categoryRepo.create({ ...createDto, user });
    return this.categoryRepo.save(category);
  }

  async findAll(user: User, whu: 'ASC' | 'DESC' = 'DESC'): Promise<Category[]> {
    return this.categoryRepo.find({
      where: { user: { id: user.id } },
      order: { createdAt: whu },
    });
  }

  async remove(id: number, user: User): Promise<void> {
    const category = await this.categoryRepo.findOne({
      where: { id, user: { id: user.id } },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    await this.categoryRepo.remove(category);
  }
}
