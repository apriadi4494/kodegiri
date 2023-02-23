import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class EventDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  date: string;

  @ApiProperty()
  time: string;

  @ApiProperty()
  location: string;
}

export class CreateEventDto {
  @ApiProperty({ type: EventDto })
  data: string;

  @ApiPropertyOptional({ type: 'string', format: 'binary', required: true })
  image: Express.Multer.File;
}
