import {sequelize} from '../config/db.js'; // Adjust the path as necessary
import User from './User.model.js'; // Adjust the path as necessary
import Blog from './Blog.model.js';
import Hashtag from './Hashtag.model.js';
import BlogHashtag from './BlogHashtag.model.js';
import Comment from './Comment.model.js';
import BlogLike from './BlogLike.model.js';

const db = {
    sequelize,
    User,
    Blog,
    Hashtag,
    BlogHashtag,
    Comment,
    BlogLike
}

db.syncDB = async () => {
    try {
      await db.sequelize.sync({ force: false });  // Set force to false in production
      console.log('Database synced successfully');
    } catch (error) {
      console.error('Error syncing database:', error);
    }
};

export default db;
