import { DataTypes } from 'sequelize';
import {sequelize} from '../config/db.js'; 
import User from './User.model.js';  // Import User model to define relationship
import Blog from './Blog.model.js';  // Import Blog model to define relationship

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
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  reply_of: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
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
  timestamps: false,
});

// Relationships
Comment.belongsTo(User, { foreignKey: 'user_id' });
Comment.belongsTo(Blog, { foreignKey: 'blog_id' });
Comment.belongsTo(Comment, { foreignKey: 'reply_of', as: 'parentComment' });

export default Comment;
