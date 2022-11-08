import { Table, Column, Model, DataType, HasMany, BelongsToMany } from 'sequelize-typescript';
import { Consumption } from './Consumption.model';

@Table({
  tableName: 'user',
})
export class User extends Model {
  @Column({
    type: DataType.STRING,
  })
  name!: string

  @Column({
    type: DataType.STRING,
  })
  email!: string

  @Column({
    type: DataType.STRING,
  })
  password!: string

  @HasMany(() => Consumption, {
    foreignKey: 'userId',
  })
  consumptions!: Consumption[]
}

export async function syncUser() {
  try {
    await User.sync({logging: false});
    console.log('Tabela user criada com sucesso!');
  } catch (error) {
    console.error('Não foi possível criar a tabela user: ', error);
  }
}