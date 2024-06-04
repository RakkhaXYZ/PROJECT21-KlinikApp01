import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Users from "./UsersModel.js";
import Dokter from "./DokterModels.js";


const {DataTypes} = Sequelize;

const Pasien = db.define('pasien', {
  uuid:{
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    validate:{
      notEmpty: true
    }
  },
  name:{
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      notEmpty: true,
      len: [3, 100]
    }
  },
  alamat: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate:{
      notEmpty: true,
    }
  },
  ttl:{
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [3, 255]
    }
  },
  nohandphone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      notEmpty: true
    }
  },
  keluhan: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate:{
      notEmpty: true,
    }
  }

},{
  freezeTableName: true
});

// untuk melakukan relasi antar tabel 
Users.hasMany(Pasien);
Dokter.hasMany(Pasien);
Pasien.belongsTo(Users, {foreignKey: 'userId'});
Pasien.belongsTo(Dokter, {foreignKey: 'dokterId'});
export default Pasien;