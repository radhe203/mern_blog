import User from "../models/user.model.js";
import bcryptjs from "bcryptjs"
export async function signup(req,res,next){
    const {username,email,password} = req.body;
   

    if(!username || !email || !password || username ==='' || email==='' || password ==='') {
        return res.status(400).json({message:"all feilds are required"})
    }
    const hssedPassword = bcryptjs.hashSync(password,10)
    try {
        const newUser = new User({
            username,email,password:hssedPassword
        })
        await newUser.save()
        res.json("signup successfull !!")
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}