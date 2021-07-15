const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const UserCollection=require('../Models/Schema')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const JWT_SECRET_KEY="wicw09e2fheofhq3hg3"//random
const RequireLogin=require('../Middleware/RequireLogin')
//SIGNUP ROUTE
router.post('/signup',(req,res)=>{
    const {name,email,password}=req.body
    if(!name||!email||!password||email==""||password==""||name==""){
        res.status(500).json({"error":"Enter all the fields"})
    }else{
        UserCollection.findOne({email:email})
        .then((savedUser)=>{
             if(savedUser){
                 res.status(406).json({"error":"User already exist"})
             }else{
                 bcrypt.hash(password,12)//encrypt passwords so that if someone have access to database can't see password
                 .then((hashedPassword)=>{
                  const user=new UserCollection({
                     name:name,
                     email:email,
                     password:hashedPassword
                 })
                 user.save()
                 .then(()=>{
                     res.status(200).json({"message":"Signup successfull"})
                 }).catch((err)=>{
                     res.status(500).send({"error":"Signup failed"})
                 })
                 })
                 
             }
        })
        .catch((err)=>{
          console.log(`Error occurred:${err}`)
        })
        
    }
})

//SIGNIN ROUTE
router.post('/signin',(req,res)=>{
    const {email,password}=req.body
    
    if(!email||!password||email==""||password==""){
        res.status(500).json({"error":"One of the fields is missing"})
    }else{
        UserCollection.findOne({email:email})
        .then((savedUser)=>{
              if(!savedUser){
                  res.status(500).json({"error":"Invalid email or password"})
              }else{
                
                  bcrypt.compare(password,savedUser.password)
                  .then((matched)=>{
                      if(matched){
                          //res.status(200).send("User identified and signed in")
                          const token=jwt.sign({_id:savedUser._id},JWT_SECRET_KEY)//generate a token on basis of id 
                          const _id=savedUser._id
                          const name=savedUser.name
                          const email=savedUser.email
                          
                          res.json({"token":token,"user":{_id,name,email}})//send token to user for authorization
                          
                      }else{
                          res.status(500).json({"error":"Invalid email or password"})
                      }
                  })
                  .catch((err)=>{
                     console.log(err)
                  })
              }
        })
        .catch((err)=>{
            res.status(500).send(err)
        })
    }
})

//protected route for token
router.get('/protected',RequireLogin,(req,res)=>{//user will be able to access this protected route if token is matched from RequireLogin middleware
    res.send("Hi User")
})



module.exports=router