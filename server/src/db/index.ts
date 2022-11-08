import { Sequelize } from 'sequelize-typescript';
import { sequelizeConfig } from '../configs/sequelize.config'
import { Consumption } from '../models/Consumption.model';
import { User } from '../models/User.model';

const sequelize = new Sequelize(
  String(sequelizeConfig.database),
  String(sequelizeConfig.username),
  sequelizeConfig.password, {
    host: sequelizeConfig.host,
    port: sequelizeConfig.port,
    dialect: sequelizeConfig.dialect,
    models: [User, Consumption],
  })

sequelize.authenticate()
  .then(() => {
    console.log('DB conectado com sucesso.');
  }).catch((error) => {
    console.error('Não foi possível conectar ao db:', error);
  })

export { sequelize }
