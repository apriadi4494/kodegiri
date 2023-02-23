import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { EventDto } from './dto/create-event-dto';
import { Event } from './entities/event.entity';
import * as fs from 'fs';
import { EventImage } from './entities/event-image.entity';
import { QueryPaginate } from '../../commons/dto/queryPaginate';
import { convertMeta } from '../../libs/api-responses/metaPaginate';
import { offset } from '../../libs/api-responses/offsetsCalculate';
import { PUBLIC_IMAGE } from '../../commons/fixtures/path';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event)
    private eventModule: typeof Event,
    @InjectModel(EventImage)
    private eventImageModule: typeof EventImage,
    private readonly sequelize: Sequelize,
  ) {}

  async findAll(query: QueryPaginate) {
    try {
      const { rows, count } = await this.eventModule.findAndCountAll({
        limit: query.limit,
        offset: offset(query),
      });

      const meta = convertMeta(count, query);

      return { data: rows, meta };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.eventModule.findOne({
        where: { id },
        include: ['image'],
      });

      if (!data) throw new NotFoundException('Data not found');
      return data;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async create(payload: EventDto, file: Express.Multer.File) {
    // First, we start a transaction from your connection and save it into a variable
    const transaction = await this.sequelize.transaction();
    try {
      let image = null;

      if (file) {
        image = {
          name: file.originalname,
          path: `${file.destination.replace('./', PUBLIC_IMAGE)}/${
            file.filename
          }`,
          type: file.mimetype,
        };
      }

      const newPayload = {
        ...payload,
        image,
      };

      const create = await this.eventModule.create(newPayload, {
        include: ['image'],
        transaction,
      });

      await transaction.commit();
      return create;
    } catch (err) {
      // REMOVE FILE
      if (file && fs.existsSync(`${file.destination}/${file.filename}`))
        fs.unlinkSync(`${file.destination}/${file.filename}`);

      await transaction.rollback();
      throw new BadRequestException(err.message);
    }
  }

  async update(id, payload: EventDto, file: Express.Multer.File) {
    // First, we start a transaction from your connection and save it into a variable
    const transaction = await this.sequelize.transaction();
    const { name, date, time, location } = payload;
    try {
      const dataEvent = await this.eventModule.findOne({
        where: { id },
        include: ['image'],
      });

      if (!dataEvent) throw new NotFoundException('Data not found');

      // IF FILE EXIST
      if (file) {
        const fileImage = {
          name: file.originalname,
          path: `${file.destination.replace('./', PUBLIC_IMAGE)}/${
            file.filename
          }`,
          type: file.mimetype,
          eventId: id,
        };

        if (dataEvent.image) {
          const imagePath = dataEvent.image.path;

          // REMOVE OLD FILE
          if (file && fs.existsSync(imagePath.replace(PUBLIC_IMAGE, './')))
            fs.unlinkSync(imagePath.replace(PUBLIC_IMAGE, './'));

          await this.eventImageModule.update(fileImage, {
            where: { id: dataEvent.image.id },
            transaction,
          });
        } else {
          await this.eventImageModule.create(fileImage, { transaction });
        }
      }

      await this.eventModule.update(
        { name, date, time, location },
        {
          where: { id },
          transaction,
        },
      );

      await transaction.commit();
      return 'success';
    } catch (err) {
      // REMOVE FILE
      if (file && fs.existsSync(`${file.destination}/${file.filename}`))
        fs.unlinkSync(`${file.destination}/${file.filename}`);

      await transaction.rollback();
      throw new BadRequestException(err.message);
    }
  }

  async deleteOne(id: string) {
    try {
      await this.eventModule.destroy({
        where: { id },
      });

      return 'success';
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
