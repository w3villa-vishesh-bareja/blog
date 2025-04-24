import {sequelize} from '../config/db.js'; 
import User from './User.model.js'; 
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

Object.values(db).forEach((model) => {
    if (model.associate) {
        model.associate(db);
    }
});

db.syncDB = async () => {
    try {
      await db.sequelize.sync({ force: false });  
      console.log('Database synced successfully');
    } catch (error) {
      console.error('Error syncing database:', error);
    }
};

export default db;
