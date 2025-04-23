import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateToken = (payload, JWT_EXPIRATION = "1h") => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in the environment variables");
    }
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};

export const verifyToken = async (token) => {
    try {
        jwt.verify(token, process.env.JWT_SECRET); // Use process.env.JWT_SECRET
        return jwt.decode(token);
    } catch (error) {
        console.log(error);
        return null;
    }
};


