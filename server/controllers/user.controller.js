import { sequelize } from '../config/db.js';
import db from '../models/index.js';
import nativeQueries from '../nativequeries/nativeQueries.js';
import { responseHandler , generateToken , hashPassword , comparePassword } from '../utils/index.js'; 
import { registerValidator } from '../validators/user.validator.js';

export const register = async (req, res) => { 
    console.log(req.body)
    const {error} = registerValidator.validate(req.body);
    if(error){
        return res.status(400).send({message:error.message});
    }
    const {name , email , userPassword} = req.body;
    
    try {
        const exisitingUser = await sequelize.query(nativeQueries.getUser ,{replacements : {email} , type: sequelize.QueryTypes.SELECT});
        console.log(exisitingUser)
        if(exisitingUser.length > 0){
            return res.status(409).send({message:"duplicate user"});
        }
        const password = await hashPassword(userPassword)
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
    const {email , userPassword} = req.body;

    try {
        const exisitingUser = await sequelize.query(nativeQueries.getUser ,{replacements : {email} , type: sequelize.QueryTypes.SELECT});

        if(exisitingUser.length > 0){
            if(await comparePassword(userPassword , exisitingUser[0].password)){
                const token = generateToken({email , unique_id : exisitingUser.unique_id});
                return responseHandler(res,200,"Login Successfull" ,[{exisitingUser , token}]);
            } 
            else res.status(400).send({message:"Wrong email or password"});
        }
        res.status(404).send({message:"User does not exist"});
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"internal server error"});
    }
}

export const getUser = async (req, res) => {
    const {unique_id, email} = req.user;
    try {
        const user = await sequelize.query(nativeQueries.getUser ,{replacements : {email} , type: sequelize.QueryTypes.SELECT});
        if(user.length > 0){
            return responseHandler(res,200,"User fetched successfully" , [user]);
        }
        res.status(404).send({message:"User does not exist"});
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"internal server error"});
    }
}