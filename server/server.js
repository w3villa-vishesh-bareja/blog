import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import db from './models/index.js'

import { blogRoutes, userRoutes } from './routes/index.js'

const app = express();
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