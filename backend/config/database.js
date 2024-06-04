import { Sequelize } from "sequelize";

const db = new Sequelize('sahabat-sehat', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

export default db;