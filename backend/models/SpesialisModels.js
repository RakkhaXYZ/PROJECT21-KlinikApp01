import { Sequelize } from "sequelize";
import db from "../config/database.js";






const {DataTypes} = Sequelize;

const Spesialis = db.define('spesialis', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      notEmpty: true,
      len: [3, 100]
    }
  }
 
}, {
  freezeTableName: true
});


export default Spesialis;
