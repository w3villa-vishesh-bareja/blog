import { DataTypes } from 'sequelize';
import {sequelize} from '../config/db.js';

const BlogLike = sequelize.define('BlogLikes', {
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

BlogLike.associate = (models) => {
  BlogLike.belongsTo(models.Blog, { foreignKey: 'blog_id' });
  BlogLike.belongsTo(models.User, { foreignKey: 'user_id' });
};

export default BlogLike;