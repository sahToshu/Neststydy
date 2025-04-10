import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TypeDto } from './dto/type.dto';
import { TypeService } from './type.service';

@ApiTags('TransactionTypes')
@Controller('types')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Get()
  @ApiOperation({ summary: 'tyt vse' })
  @ApiResponse({ status: 200, type: [TypeDto] })
  async findAll(): Promise<TypeDto[]> {
    return this.typeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ny brat iskat tyt nada' })
  @ApiResponse({ status: 200, type: TypeDto })
  @ApiResponse({ status: 404, description: 'Type not found' })
  async findOne(@Param('id') id: number): Promise<TypeDto> {
    return this.typeService.findOne(id);
  }
}
