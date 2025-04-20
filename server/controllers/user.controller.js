import { sequelize } from '../config/db.js';
import db from '../models/index.js';
import nativeQueries from '../nativequeries/nativeQueries.js';
import {responseHandler , generateToken } from '../utils/index.js'; 
import { registerValidator } from '../validators/user.validator.js';
export const register = async (req, res) => { 
    const {error} = registerValidator.validate(req.body);
    if(error){
        return res.status(400).send({message:error.message});
    }
    const {name , email , password} = req.body;
    
    try {
        const exisitingUser = await sequelize.query(nativeQueries.getUser ,{replacements : {email} , type: sequelize.QueryTypes.SELECT});
        console.log(exisitingUser)
        if(exisitingUser.length > 0){
            return res.status(409).send({message:"duplicate user"});
        }
        const newUser = await db.User.create({
            name,
            email,
            password,
            unique_id: sequelize.literal('UUID()') // Generate UUID
        });
        return responseHandler(res , 201 , "user created" , [newUser])

    } catch (error) {
        console.log(error);
        res.status(500).send({message:"internal server error"});
    }
}
export const login = async (req, res) => { 
    
}