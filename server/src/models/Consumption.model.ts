import { Table, Column, Model, DataType, HasOne, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { User } from './User.model';

@Table({
  tableName: 'consumption',
})
export class Consumption extends Model {
  @Column({
    type: DataType.STRING,
  })
  tag!: string

  @Column({
    type: DataType.DATE,
  })
  date!: Date

  @Column({
    type: DataType.INTEGER,
  })
  consumption!: number

  @Column({
    type: DataType.INTEGER,
  })
  value!: number

  @Column({
    type: DataType.INTEGER,
  })
  discount!: number

  @ForeignKey(() => User)
  userId!: number

  @BelongsTo(() => User)
  user!: User
}

export async function syncConsumption() {
  try {
    await Consumption.sync({logging: false});
    console.log('Tabela consumption criada com sucesso!');
  } catch (error) {
    console.error('Não foi possível criar a tabela consumption: ', error);
  }
}