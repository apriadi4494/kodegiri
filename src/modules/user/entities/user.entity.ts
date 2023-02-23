import {
  Model,
  Table,
  PrimaryKey,
  Column,
  DataType,
  BeforeCreate,
} from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';

@Table({ tableName: 'users', timestamps: false })
export class User extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  public id: string;

  @Column({ type: DataType.STRING, unique: true })
  public email: string;

  @Column(DataType.STRING)
  public password: string;

  @BeforeCreate
  static setPassword(instance: User) {
    instance.password = bcrypt.hashSync(
      instance.password,
      bcrypt.genSaltSync(8),
    );
  }

  async validatePassword(password: string): Promise<boolean> {
    const comparePassword = await bcrypt.compare(password, this.password);
    return comparePassword;
  }
}
