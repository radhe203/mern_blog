import express from 'express'
import {configDotenv} from 'dotenv'
import mongoose from 'mongoose'
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


app.listen(3000,()=>{
    console.log("app is running on port 3000!!")
})