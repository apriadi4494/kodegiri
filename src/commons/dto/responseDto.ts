import { ApiProperty } from '@nestjs/swagger';
import { MetaProperty } from './metaProperty';

export class ResponseDto<T> {
  @ApiProperty()
  status: number;

  @ApiProperty()
  success: boolean | null;

  @ApiProperty()
  error: boolean | null;

  @ApiProperty()
  data: T;

  @ApiProperty()
  meta: MetaProperty | null;
}
