import { sequelize } from '../config/db.js';
import { Op } from 'sequelize';
import db from '../models/index.js';
import {responseHandler} from '../utils/index.js';
import { blogValidator , likeBlogValidator, updateBlogValidator } from '../validators/index.js';

export async function getAllBlogs(req, res) {
    console.log("----------------------------------------",req.body)
    const {userId} = req.body;
    try {
        const blogs = await sequelize.query(
            `
            SELECT 
                b.*, 
                COUNT(bl.id) AS like_count,
                 MAX(CASE WHEN bl.user_id = :userId THEN 1 ELSE 0 END) AS liked_by_current_user,
                u.name AS user_name
            FROM Blogs b
            LEFT JOIN BlogLikes bl ON b.id = bl.blog_id LEFT JOIN Users u ON b.user_id = u.id
            GROUP BY b.id
            `,
            { type: sequelize.QueryTypes.SELECT , replacements :{userId} },
        );
        
        return responseHandler(res, 200, "Blogs fetched successfully", [blogs]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function createBlog(req, res) {
    const {error} = blogValidator.validate(req.body);
    if(error){
        return res.status(400).send({message:error.message});
    }
    const { title, content, userId  , type , category} = req.body; // change userID to be fetched from token
    try {
        const newBlog = await db.Blog.create({
            title,
            description:content,
            user_id:userId,
            type,
            unique_id: sequelize.literal('UUID()') ,
            category
        });
        return responseHandler(res, 201, "Blog created successfully", [newBlog]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function updateBlog(req, res) {
    const {error} = updateBlogValidator.validate(req.body);
    if(error){
        return res.status(400).send({message:error.message});
    }
    const { unique_id } = req.params;
    const { title, content , type, userId } = req.body;

    try {
        const blog = await db.Blog.findOne({unique_id});

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        if (blog.user_id !== userId) {
            return res.status(403).json({ 
                message: "Unauthorized: You can only update your own blogs" 
            });
        }

        blog.title = title;
        blog.content = content;
        blog.type = type;

        await blog.save();
        return res.status(200).json({ message: "Blog updated successfully", blog });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
export async function deleteBlog(req, res) {
    const { unique_id } = req.params;
    const { userId } = req.body;

    try {
        // Start a transaction
        const t = await sequelize.transaction();

        try {
            // Find the blog first
            const blog = await db.Blog.findOne({
                where: { unique_id }
            });

            if (!blog) {
                await t.rollback();
                return res.status(404).json({ message: "Blog not found" });
            }

            if (blog.user_id !== userId) {
                await t.rollback();
                return res.status(403).json({ 
                    message: "Unauthorized: You can only delete your own blogs" 
                });
            }

            // await db.BlogLike.destroy({
            //     where: { blog_id: blog.id },
            //     transaction: t
            // });

            // await db.Comment.destroy({
            //     where: { blog_id: blog.id },
            //     transaction: t
            // });

            await blog.destroy({ transaction: t });

            await t.commit();

            return res.status(200).json({ message: "Blog deleted successfully" });
        } catch (error) {
            await t.rollback();
            throw error;
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function likeBlog(req, res) {
    const {error} = likeBlogValidator.validate(req.body);
    if(error){
        return res.status(400).send({message:error.message});
    }
    console.log(req.body)
    const { blogId, userId } = req.body;

    try {
        const existingLike = await db.BlogLikes.findOne({
            where: {
                blog_id: blogId,
                user_id: userId
            }
        });

        if (existingLike) {
            await existingLike.destroy();
            return responseHandler(res, 200, "Blog unliked successfully", []);
        }

        const newLike = await db.BlogLikes.create({
            blog_id: blogId,
            user_id: userId
        });

        return responseHandler(res, 201, "Blog liked successfully", [newLike]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function commentOnBlog(req, res) {
    const { blogId, userId, comment, reply_of } = req.body;

    try {
        const newComment = await db.Comment.create({
            blog_id: blogId,
            user_id: userId,
            description: comment,
            unique_id: sequelize.literal('UUID()'),
            reply_of
        });
        return responseHandler(res, 201, "Comment added successfully", [newComment]);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function getBlogComments(req, res) {
    const { blogId } = req.body;
    try {
        const comments = await db.Comment.findAll({
            where: {
                blog_id: blogId
            }
        });
        return responseHandler(res, 200, "Comments retrieved successfully", [comments]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
export async function getBlogLikes(req, res) {
    const { blogId } = req.body;
    try {
        const likes = await db.BlogLikes.findAll({
            where: {
                blog_id: blogId
            }
        });
        return responseHandler(res, 200, "Likes retrieved successfully", [likes]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
export async function getBlogByUserId(req, res) {
    const { userId } = req.body;

    try {
        const blogs = await db.Blog.findAll({
            where: {
                user_id: userId
            }
        });

        return res.status(200).json({ message: "Blogs retrieved successfully", blogs });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function getBlogByTitle(req, res) {
    const { title } = req.params;

    try {
        const blogs = await db.Blog.findAll({
            where: {
                title: {
                    [Op.like]: `%${title}%`
                }
            }
        });

        return res.status(200).json({ message: "Blogs retrieved successfully", blogs });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
