import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

export const generateToken = (payload , JWT_EXPIRATION = "1h") => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
}

export const verifyToken = async (token) => {
    try {
        jwt.verify(token, JWT_SECRET);
        return jwt.decode(token);
    } catch (error) {
        console.log(error);
        return null;
    }
}
