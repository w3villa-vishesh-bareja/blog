import { DataTypes } from 'sequelize';
import {sequelize} from '../config/db.js'; 


const Comment = sequelize.define('Comment', {
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
  blog_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Blogs', 
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', 
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  reply_of: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  description: {
    type: DataTypes.TEXT,
  },
  Likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

// Relationships
Comment.associate = (models) => {
  Comment.belongsTo(models.User, { 
      foreignKey: 'user_id',
  });
  Comment.belongsTo(models.Blog, { 
      foreignKey: 'blog_id',
  });
  Comment.belongsTo(models.Comment, { 
      foreignKey: 'reply_of', 
  });
  Comment.hasMany(models.Comment, { 
      foreignKey: 'reply_of', 
  });
};
export default Comment;
