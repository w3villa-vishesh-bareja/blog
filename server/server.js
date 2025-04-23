import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import db from './models/index.js'
import cors from 'cors'

import { blogRoutes, userRoutes } from './routes/index.js'
import User from './models/User.model.js'
import Blog from './models/Blog.model.js'
import Hashtag from './models/Hashtag.model.js'
import BlogHashtag from './models/BlogHashtag.model.js'
import BlogLike from './models/BlogLike.model.js'
import Comment from './models/Comment.model.js'

const app = express();

const models = {
  User,
  Blog,
  Hashtag,
  BlogHashtag,
  Comment,
  BlogLike,
}

Object.values(models).forEach((model) => {
  if (model.associate) {
      model.associate(models);
  }
});

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
dotenv.config();
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/blogs', blogRoutes);
app.use('/api/v1/users', userRoutes);

db.syncDB().then(() => {
    app.listen(5000, () => {
      console.log('Server running on http://localhost:5000');
    });
  }).catch(err => {
    console.error('Error syncing database:', err);
  });