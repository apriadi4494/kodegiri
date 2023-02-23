import {
  Model,
  Table,
  PrimaryKey,
  Column,
  DataType,
  HasOne,
} from 'sequelize-typescript';
import { EventImage } from './event-image.entity';

@Table({ tableName: 'events', timestamps: false })
export class Event extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  public id: string;

  @Column({ type: DataType.STRING })
  public name: string;

  @Column({ type: DataType.DATEONLY })
  public date: string;

  @Column({ type: DataType.TIME })
  public time: string;

  @Column({ type: DataType.STRING })
  public location: string;

  @HasOne(() => EventImage)
  image: EventImage;
}
