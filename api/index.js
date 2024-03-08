import express from 'express'
import {configDotenv} from 'dotenv'
import mongoose from 'mongoose'
import UserRoutes from './routes/user.routes.js'
import AuthRoutes from './routes/auth.routes.js'
import cookieParser from "cookie-parser";
import postRoutes from "./routes/post.routes.js"
import commentRoutes from "./routes/comment.routes.js"
const app = express()

configDotenv()
app.use(express.json())
app.use(cookieParser())


//database

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log("connected to mongodb")
})
.catch((error)=>{
    console.log(error)
})

//server
app.listen(3000,()=>{
    console.log("app is running on port 3000!!")
})



//routes

app.use('/api/user',UserRoutes)
app.use('/api/auth',AuthRoutes)
app.use('/api/post',postRoutes)
app.use('/api/comment', commentRoutes)


//errors

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || "internal server error"

    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})