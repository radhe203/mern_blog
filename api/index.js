import express from 'express'
import {configDotenv} from 'dotenv'
import mongoose from 'mongoose'
import UserRoutes from './routes/user.routes.js'
import AuthRoutes from './routes/auth.routes.js'
const app = express()

configDotenv()
app.use(express.json())


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



//errors

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || "internal server error"

    res.status(500).json({
        success:false,
        statusCode,
        message
    })
})