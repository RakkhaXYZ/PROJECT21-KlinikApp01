import { Sequelize } from "sequelize";
import db from "../config/database.js";





const {DataTypes} = Sequelize;

const Skedule = db.define('skedule', {
  title:{
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      notEmpty: true,
      len: [3, 100]
    }
  },
  sceduledate:{
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      notEmpty: true,
      isEmail: true
    }
  },
  sceduletime:{
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      notEmpty: true
     
    }

  },
  namedokter:{
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      notEmpty: true,
      len:[0, 255]
    }
  },
  dokterSpesialis:{
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      notEmpty: true
    }
  },
  namePasien:{
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      notEmpty: true,
      len:[0, 255]
    }
  }

}, {
  freezeTableName: true
});




export default Skedule;