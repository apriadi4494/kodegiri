import {
  Model,
  Table,
  PrimaryKey,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Event } from './event.entity';

@Table({ tableName: 'event_images', timestamps: false })
export class EventImage extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  public id: string;

  @Column({ type: DataType.STRING })
  public name: string;

  @Column({ type: DataType.STRING })
  public type: string;

  @Column({ type: DataType.STRING })
  public path: string;

  @ForeignKey(() => Event)
  @Column({ type: DataType.UUID })
  eventId: string;

  @BelongsTo(() => Event)
  event: Event;
}
