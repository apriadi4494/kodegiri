import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryPaginate {
  @ApiPropertyOptional()
  page?: number;

  @ApiPropertyOptional()
  limit?: number;

  @ApiPropertyOptional({ example: 'sortBy=id:DESC' })
  sortBy?: string;

  @ApiPropertyOptional()
  search?: string;

  @ApiPropertyOptional({ example: 'filter.age=10' })
  filter?: string;
}
