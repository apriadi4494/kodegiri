import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EventImage } from './entities/event-image.entity';
import { Event } from './entities/event.entity';
import { eventController } from './event.controller';
import { EventService } from './event.service';

@Module({
  imports: [SequelizeModule.forFeature([Event, EventImage])],
  controllers: [eventController],
  providers: [EventService],
  exports: [SequelizeModule],
})
export class EventModule {}
