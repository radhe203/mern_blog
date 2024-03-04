import express from 'express'
import {configDotenv} from 'dotenv'
import mongoose from 'mongoose'
import UserRoutes from './routes/user.routes.js'
const app = express()
configDotenv()

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