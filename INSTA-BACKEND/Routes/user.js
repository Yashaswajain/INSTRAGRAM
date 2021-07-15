const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const RequireLogin=require('./../Middleware/RequireLogin')
const UserCollection=require('./../Models/Schema')//ye user schema hai
const postCollection=require('./../Models/postSchema')

router.get('/user/:id',RequireLogin,(req,res)=>{//user id hamne parameters me bheji
    UserCollection.findOne({_id:req.params.id})//first find the user from userCollection
    .select("-password")
    .then((user)=>{
           postCollection.find({postedBy:req.params.id})//if user milgya to uski posts find kro
           .populate("postedBy","_id name")
           .exec((err,posts)=>{
               if(err){
                   return res.status(400).json({error:err})
               }else{
                   return res.status(200).json({user,posts})
               }
           })
    })
    .catch((err)=>{
        return res.status(400).json({error:"User not found"})
    })
})
 
module.exports=router