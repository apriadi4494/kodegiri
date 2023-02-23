import {
  UseGuards,
  Controller,
  Post,
  UseInterceptors,
  Req,
  Res,
  Body,
  UploadedFile,
  Put,
  Param,
  Get,
  Query,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import {
  PaginateQueryInterface,
  PaginateQuery,
} from 'nestjs-sequelize-paginate';
import { Request, Response } from 'express';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { ApiBaseResponse } from '../../commons/swagger/apiBaseResponse';
import { ApiResponse } from '../../libs/api-responses';
import { media } from '../../libs/utils/media';
import { CreateEventDto, EventDto } from './dto/create-event-dto';
import { UpdateEventDto } from './dto/update-event-dto';
import { Event } from './entities/event.entity';
import { EventService } from './event.service';
import { QueryPaginate } from '../../commons/dto/queryPaginate';

@UseGuards(JwtAuthGuard)
@ApiTags('Event')
@ApiBearerAuth()
@Controller('event')
export class eventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  async getAllEvent(
    @Res() res: Response,
    @Query() query: QueryPaginate,
  ): Promise<any> {
    const data = await this.eventService.findAll(query);
    ApiResponse(res).paginate(data);
  }

  @Get(':id')
  async getOneEvent(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<any> {
    const data = await this.eventService.findOne(id);
    ApiResponse(res).success(data);
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBaseResponse(Event)
  @UseInterceptors(FileInterceptor('image', { ...media('event') }))
  async createData(
    @Res() res: Response,
    @Body() createEventDto: CreateEventDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const jsonData: EventDto = JSON.parse(createEventDto.data);
    const data = await this.eventService.create(jsonData, file);
    ApiResponse(res).success(data);
  }

  @Put(':id')
  @ApiBaseResponse(Event)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { ...media('event') }))
  async updateData(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() createEventDto: UpdateEventDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const jsonData: EventDto = JSON.parse(createEventDto.data);
    const data = await this.eventService.update(id, jsonData, file);
    ApiResponse(res).success(data);
  }

  @Delete(':id')
  async deleteOne(@Res() res: Response, @Param('id') id: string): Promise<any> {
    const data = await this.eventService.deleteOne(id);
    ApiResponse(res).success(data);
  }
}
