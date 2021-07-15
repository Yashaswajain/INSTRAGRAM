const express=require('express')
const app=express()
const mongoose=require('mongoose')
const cors=require('cors')
const PORT=process.env.PORT||8000
const mongoURL="mongodb+srv://YASHASWA:csT7rmzdH0Auo5iK@cluster0.fpttl.mongodb.net/INSTADB?retryWrites=true&w=majority"
const authRoute=require('./Routes/auth')
const postRoute=require('./Routes/post')
const userRoute=require('./Routes/user')
const UserCollection=require('./Models/Schema')
const postCollection=require('./Models/postSchema')
//middleware:these are functions used to execute any code,to modify req,res cycle,to call next middleware if present otherwise call routing
app.use(express.json())//it gets executed first
app.use(cors())


//mongodb
mongoose.connect(mongoURL,{useCreateIndex:true,useFindAndModify:true,useUnifiedTopology:true,useNewUrlParser:true})
.then(()=>{
    console.log('Successfully connected to mongoDB')
}).catch((err)=>{
    console.log(err)
})

//routing
app.use(authRoute)
app.use(postRoute)
app.use(userRoute)



//starting the server
app.listen(PORT,(req,res)=>{
    console.log(`Server running at PORT:${PORT}`)
})


