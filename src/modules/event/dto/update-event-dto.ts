import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EventDto } from './create-event-dto';

export class UpdateEventDto {
  @ApiProperty({ type: EventDto })
  data: string;

  @ApiPropertyOptional({ type: 'string', format: 'binary', required: true })
  image: Express.Multer.File;
}
