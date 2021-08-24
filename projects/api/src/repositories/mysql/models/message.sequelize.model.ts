import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

@Table({
  tableName: "messages",
  underscored: true,
})
class MessageSequelizeModel extends Model<MessageSequelizeModel> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  public id!: number;

  @Column(DataType.UUIDV4)
  public uuid!: string;

  @Column(DataType.STRING)
  public name!: string;

  @Column(DataType.STRING)
  public message!: string;

  @Column(DataType.NUMBER)
  public distance!: number;
}

export default MessageSequelizeModel;
