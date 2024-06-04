import { Sequelize } from "sequelize";

import db from '../config/database.js';

const {DataTypes} = Sequelize;

const Users = db.define('users', {
  uuid: {
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
      len:[3, 100]
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
      notEmpty: false,
    }
  },
  foto:{
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      notEmpty: true,
      len: [0, 255]
    }
  },
  url:{
    type: DataTypes.STRING,
    allowNull:false,
    validate:{
      notEmpty: true
    }
  
  },
  nohandphone:{
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      notEmpty: true,
    }
  },
  role:{
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      notEmpty: true
    }
  }
},{

  freezeTableName: true
});

export default Users;