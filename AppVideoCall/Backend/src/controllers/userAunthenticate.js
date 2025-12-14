import { User } from '../models/userModel.js';
import httpStatus from 'http-status';
import bcrypt,{hash} from 'bcrypt';
import crypto from 'crypto';

const login = async(req,res) =>{
    const {username,password} = req.body;
    if(!username || !password){
        res.json({message:"PLEASE ENTER USERNAME AND PASSWORD"});
    }
    try{
        const user = await User.findOne({username:username});
        if(!user){
            return res.status(httpStatus.NOT_FOUND).json({message:"MESSAGE NOT FOUND"});
        }
        if(bcrypt.compare(password,user.password)){
            let token = crypto.randomBytes(20).toString("hex");
            user.token = token;
            //return user;
            await user.save();
            return res.status(httpStatus.OK).json({messsage:"LOGIN SUCCUSSFULLY",token:token});
        }
    }catch(e){
        return res.json({message:`SOMETHING WENT WRONG!!!${e}`})
    }
}




const registerUser = async(req, res) => {
    const { name,username, password } = req.body;

    try{
        const existingUser = await User.findOne({ username });
        if(existingUser){
            return res.status(httpStatus.FOUND).json({message:"USER ALREADY FOUND"});
        }
        const hashedPassword = await bcrypt.hash(password,10); // Implement proper hashing in production
        const newUser = new User(
            {
                name:name,
                username:username,
                password:hashedPassword,
            }
        );
    await newUser.save();
    return res.status(httpStatus.CREATED).json({message:"USER REGISTERED SUCCUSSFULLY"});
    }catch(e){
        res.json({message:`SOMETHING WENT WRONG!!! --- REGISTER USER${e}`});
    }
}

export {login,registerUser}