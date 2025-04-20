import { DataTypes } from 'sequelize';
import {sequelize} from '../config/db.js'; 

const Hashtag = sequelize.define('Hashtag', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  tag: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
  },
});

export default Hashtag;
