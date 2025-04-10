import { ApiProperty } from '@nestjs/swagger';

export class HttpExceptionResponseDto {
  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({ example: 'Validation failed or Invalid data' })
  message: string | string[];

  @ApiProperty({ example: 'Bad Request' })
  error: string;
}
