import Joi from 'joi';

export const registerValidator = Joi.object({
    name: Joi.string().min(3).max(100).required().messages({
        'string.base': 'Name must be a string',
        'string.empty': 'Name is required',
        'string.min': 'Name must be at least 3 characters long',
        'string.max': 'Name must not exceed 100 characters',
        'any.required': 'Name is required'
    }),
    email: Joi.string().email().required().messages({
        'string.base': 'Email must be a string',
        'string.email': 'Email must be a valid email address',
        'string.empty': 'Email is required',
        'any.required': 'Email is required'
    }),
    userPassword: Joi.string().min(6).max(255).required().messages({
        'string.base': 'Password must be a string',
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 6 characters long',
        'string.max': 'Password must not exceed 255 characters',
        'any.required': 'Password is required'
    })
});