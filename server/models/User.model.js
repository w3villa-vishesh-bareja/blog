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
  timestamps: true, 
  createdAt: 'created_at', 
  updatedAt: 'updated_at', 
  hooks: {
    beforeCreate: (user) => {
      user.unique_id = user.unique_id || sequelize.fn('UUID');
    },
  },
});
User.associate = (models) => {
  User.hasMany(models.Blog, { 
      foreignKey: 'user_id',
      
  });
  User.hasMany(models.Comment, { 
      foreignKey: 'user_id',
       
  });
  User.hasMany(models.BlogLike, { 
      foreignKey: 'user_id',
    
  });
};

export default User;