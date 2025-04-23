import {register, login, getUser} from './user.controller.js';
import { createBlog, updateBlog, deleteBlog, likeBlog, commentOnBlog, getBlogLikes, getBlogByUserId, getBlogByTitle, getAllBlogs, getBlogComments} from './blog.controller.js';


export {register, login, getUser};
export {createBlog, updateBlog, deleteBlog , likeBlog , commentOnBlog, getBlogLikes, getBlogByUserId, getBlogByTitle, getAllBlogs, getBlogComments};