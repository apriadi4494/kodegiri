import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class QueryPaginate {
  @ApiProperty({ default: 1 })
  page: number;

  @ApiProperty({ default: 5 })
  limit: number;

  @ApiPropertyOptional()
  sortBy?: string;

  @ApiPropertyOptional()
  search?: string;

  @ApiPropertyOptional()
  filter?: string;
}
