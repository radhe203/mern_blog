import  Jwt  from "jsonwebtoken";
import { ErrorHandler } from "./ErrorHandler.js";

export const VerifyToken = (req,res,next) => {
    const token = req.cookies.blog_token
    if(!token){
        return next(ErrorHandler(401,"unauthorised"))
    }
    Jwt.verify(token,process.env.JWT_SEC,(err,user)=>{
        if(err){
            return next(ErrorHandler(401,'unauthorised'))
        }
        req.user=user;
        next()
    })
};
