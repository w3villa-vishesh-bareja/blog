import { DataTypes } from 'sequelize';
import {sequelize} from '../config/db.js'; 
import User from './User.model.js'; 
import BlogLike from './BlogLike.model.js';
import Comment from './Comment.model.js';

const Blog = sequelize.define('Blog', {
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
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  image: {
    type: DataTypes.STRING(255),
  },
  categories: {
    type: DataTypes.JSON,
    allowNull: true,
  },type :{
    type: DataTypes.ENUM('public', 'private'),
    allowNull: false,
  }
}, {
    timestamps: true, 
    createdAt: 'created_at', 
    updatedAt: 'updated_at', 
  
});

Blog.associate = (models) => {
  Blog.belongsTo(models.User, { 
      foreignKey: 'user_id',
      as: 'blogAuthor'  
  });
  Blog.hasMany(models.Comment, { 
      foreignKey: 'blog_id',
      as: 'blogComments' 
  });
  Blog.hasMany(models.BlogLike, { 
      foreignKey: 'blog_id',
      as: 'blogLikes'  
  });
};


export default Blog;
