import express from 'express';
import { createBlog , updateBlog , deleteBlog , likeBlog, commentOnBlog, getBlogLikes , getBlogByUserId, getBlogByTitle, getAllBlogs, getBlogComments} from '../controllers/index.js';
import {authMiddleware} from '../middlewares/index.js';
const router = express.Router();

router.post('/create', createBlog);
router.put('/update/:unique_id', updateBlog);
router.delete('/delete/:unique_id', deleteBlog);
router.post('/like/', likeBlog);
router.post('/comment/', commentOnBlog);
router.post('/getlikes/', getBlogLikes);
router.post('/getbyuserid/', getBlogByUserId);
router.get('/getbytitle/:title', getBlogByTitle);
router.post('/getallblogs', authMiddleware ,getAllBlogs);
router.post('/getcomments', getBlogComments);

export default router