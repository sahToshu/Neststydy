import {
  Controller,
  Get,
  Post,
  Body,
  ParseIntPipe,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Category } from './category.entity';
import { User } from '../user/user.entity';
import { HttpExceptionResponseDto } from '../common/dto/http-exeption-response.dto';

@ApiTags('categories')
@Controller('categories')
@ApiBearerAuth()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new category.' })
  @ApiCreatedResponse({
    type: Category,
    description: 'Category created successfully.',
  })
  @ApiBadRequestResponse({
    type: HttpExceptionResponseDto,
    description: 'Invalid input data',
  })
  @ApiUnauthorizedResponse({
    type: HttpExceptionResponseDto,
    description: 'User is not authorized.',
  })
  create(@Body() dto: CreateCategoryDto, @Request() req: { user: User }) {
    return this.categoryService.create(dto, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all category' })
  @ApiResponse({
    status: 200,
    type: [Category],
    description: 'The record has been successfully returned.',
  })
  @ApiUnauthorizedResponse({
    type: HttpExceptionResponseDto,
    description: 'User is not authorized.',
  })
  findAll(@Request() req: { user: User }) {
    return this.categoryService.findAll(req.user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete category by Id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
  })
  @ApiUnauthorizedResponse({
    type: HttpExceptionResponseDto,
    description: 'User is not authorized.',
  })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: { user: User },
  ) {
    return this.categoryService.remove(id, req.user);
  }
}
