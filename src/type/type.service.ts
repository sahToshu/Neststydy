import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Type } from './type.entity';
import { TypeDto } from './dto/type.dto';

@Injectable()
export class TypeService {
  constructor(
    @InjectRepository(Type)
    private readonly typeRepository: Repository<Type>,
  ) {}

  async findAll(): Promise<TypeDto[]> {
    const types = await this.typeRepository.find();
    return types.map(this.toDto);
  }

  async findOne(id: number): Promise<TypeDto> {
    const type = await this.typeRepository.findOne({ where: { id } });
    if (!type) {
      throw new NotFoundException(
        'idi nahyu shto ti mne prislal eto govno a ne id',
      );
    }
    return this.toDto(type);
  }

  private toDto(type: Type): TypeDto {
    return {
      id: type.id,
      name: type.name,
    };
  }
}
