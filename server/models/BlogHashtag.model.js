import { DataTypes } from 'sequelize';
import {sequelize} from '../config/db.js'; 
import Blog from './Blog.model.js';  // Import Blog model to define relationship
import Hashtag from './Hashtag.model.js';  // Import Hashtag model to define relationship

const BlogHashtag = sequelize.define('BlogHashtag', {
  blog_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  hashtag_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
}, {
  timestamps: false,
});

// Relationships
BlogHashtag.belongsTo(Blog, { foreignKey: 'blog_id' });
BlogHashtag.belongsTo(Hashtag, { foreignKey: 'hashtag_id' });

export default BlogHashtag;
