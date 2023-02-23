import { ApiProperty } from '@nestjs/swagger';

export class MetaProperty {
  @ApiProperty()
  totalItems: number;

  @ApiProperty()
  itemsPerPage: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  currentPage: number;

  @ApiProperty()
  sortBy: string[];
}
