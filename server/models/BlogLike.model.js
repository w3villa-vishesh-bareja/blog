import { DataTypes } from 'sequelize';
import {sequelize} from '../config/db.js'; 
import Blog from './Blog.model.js';  
import User from './User.model.js';  

const BlogLike = sequelize.define('BlogLike', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  blog_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
  },
}, {
  timestamps: false,
  uniqueKeys: {
    blog_user: {
      fields: ['blog_id', 'user_id'],
    },
  },
});

// Relationships
BlogLike.belongsTo(Blog, { foreignKey: 'blog_id' });
BlogLike.belongsTo(User, { foreignKey: 'user_id' });

export default BlogLike;
