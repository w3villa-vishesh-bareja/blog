import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  unique_id: {
    type: DataTypes.STRING(36),
    allowNull: false,
    unique: true,
    defaultValue: sequelize.literal('UUID()'), // Generate UUID
  },
  name: {
    type: DataTypes.STRING(100),
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  is_social: {
    type: DataTypes.TINYINT(1),
    defaultValue: 0,
  },
}, {
  timestamps: true, // Enable automatic handling of createdAt and updatedAt
  createdAt: 'created_at', // Map Sequelize's createdAt to your column name
  updatedAt: 'updated_at', // Map Sequelize's updatedAt to your column name
});

export default User;