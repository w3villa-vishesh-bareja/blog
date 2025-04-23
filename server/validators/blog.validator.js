import Joi from 'joi';

export const blogValidator = Joi.object({
    title: Joi.string().min(3).max(255).required().messages({
        'string.base': 'Title should be a string.',
        'string.empty': 'Title cannot be empty.',
        'string.min': 'Title should have at least 3 characters.',
        'string.max': 'Title should not exceed 255 characters.',
        'any.required': 'Title is required.'
    }),
    content: Joi.string().min(10).required().messages({
        'string.base': 'Content should be a string.',
        'string.empty': 'Content cannot be empty.',
        'string.min': 'Content should have at least 10 characters.',
        'any.required': 'Content is required.'
    }),
    userId: Joi.number().integer().positive().required().messages({
        'number.base': 'User ID should be a number.',
        'number.integer': 'User ID should be an integer.',
        'number.positive': 'User ID should be a positive number.',
        'any.required': 'User ID is required.'
    }),
    type : Joi.string().valid('public', 'private').required().messages({
        'string.base': 'Type should be a string.',
        'any.only': 'Type must be either "public" or "private".',
        'any.required': 'Type is required.'
    }),
    category: Joi.string().valid('sports', 'geopolitics', 'technology').optional().messages({
        'string.base': 'Category should be a string.',
        'any.only': 'Category must be either "technology", "health", or "lifestyle".'
    }),
});

export const updateBlogValidator = Joi.object({
    title: Joi.string().min(3).max(255).optional().messages({
        'string.base': 'Title should be a string.',
        'string.empty': 'Title cannot be empty.',
        'string.min': 'Title should have at least 3 characters.',
        'string.max': 'Title should not exceed 255 characters.'
    }),
    content: Joi.string().min(10).optional().messages({
        'string.base': 'Content should be a string.',
        'string.empty': 'Content cannot be empty.',
        'string.min': 'Content should have at least 10 characters.'
    }),
    type : Joi.string().valid('public', 'private').optional().messages({
        'string.base': 'Type should be a string.',
        'any.only': 'Type must be either "public" or "private".'
    }),
});

export const likeBlogValidator = Joi.object({
    blogId: Joi.number().integer().positive().required().messages({
        'string.base': 'Blog ID should be a string.',
        'string.empty': 'Blog ID cannot be empty.',
        'any.required': 'Blog ID is required.'
    }),
    userId: Joi.number().integer().positive().required().messages({
        'string.base': 'User ID should be a string.',
        'string.empty': 'User ID cannot be empty.',
        'any.required': 'User ID is required.'
    }),
});