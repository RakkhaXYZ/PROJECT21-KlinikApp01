import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Spesialis from "./SpesialisModels.js";




const {DataTypes} = Sequelize;

const Dokter = db.define('dokter', {
  uuid:{
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }, 
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      notEmpty: true,
      len: [3, 100]
    }
  },
  email:{
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      notEmpty: true,
      isEmail: true
    }
  },
  password:{
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      notEmpty: true
     
    }

  },
  foto:{
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      notEmpty: true,
      len:[0, 255]
    }
  },
  url:{
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      notEmpty: true
    }
  },
  spesialis:{
    type: DataTypes.STRING,
    allowNull:false,
    validate:{
      notEmpty: true

    }
  }
}, {
  freezeTableName: true
});

Spesialis.hasMany(Dokter);

Dokter.belongsTo(Spesialis, {foreignKey: 'spesialisId'});

export default Dokter;