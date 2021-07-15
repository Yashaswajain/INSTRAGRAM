const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const RequireLogin=require('../Middleware/RequireLogin')
const postCollection=require('../Models/postSchema')


//all posts by user
router.get('/mypost',RequireLogin,(req,res)=>{
postCollection.find({postedBy:req.user._id})//user comes from RequireLogin
.populate("postedBy","_id name")//(name of object to be used,all fields to be taken)

.then((posts)=>{
    res.status(200).send(posts)
}).catch((err)=>{
    res.status(500).send(err)
})
})

//all posts route
router.get('/allpost',RequireLogin,(req,res)=>{
    postCollection.find()
    .populate("postedBy","_id name")//populate is used to get all details of fields taken from a different schema
    .sort("-createdAt")
    .then((posts)=>{
        res.status(200).send(posts)//posts ek array hai
    }).catch((err)=>{
        res.status(500).send(err)
    })
})

//create && save post route
router.post('/createpost',RequireLogin,(req,res)=>{
const {caption,url}=req.body

if(url==""){
    return res.status(401).json({"error":'Please add a photo.'})
}
    const post=new postCollection({
       caption:caption,
       photo:url,
       postedBy:req.user
    })
    post.save()
    .then(()=>{
       res.status(200).json({"message":"Successfully posted"})
       
    }).catch((err)=>{
        res.status(500).json(err)
    })
})

//like unlike route
router.put("/like",RequireLogin,(req,res)=>{
postCollection.findByIdAndUpdate(req.body.postId,{
    $push:{likes:req.user._id}//push into likes array
},{
    new:true
}).exec((err,result)=>{
    if(err){
        res.status(401).json({error:err})
    }else{
        res.json(result)
    }
})
})

router.put("/unlike",RequireLogin,(req,res)=>{
    postCollection.findByIdAndUpdate(req.body.postId,{//frontend se leke aayenge
        $pull:{likes:req.user._id}//pull from likes array
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            res.status(401).json({error:err})
        }else{
            res.json(result)
        }
    })
})

//comments route
router.put("/comment",RequireLogin,(req,res)=>{
    postCollection.findByIdAndUpdate(req.body.postId,{//frontend se leke aayenge
        $push:{comments:comment}//pull from likes array
    },{
        new:true
    }).populate("comments.postedBy","_id name")
    .exec((err,result)=>{
        if(err){
            res.status(401).json({error:err})
        }else{
            res.json(result)
        }
    })
})

//deletepost route
router.delete("/deletepost",RequireLogin,(req,res)=>{
    postCollection.findOne({"_id":`${req.body.postId}`})
    .populate("postedBy","_id")
    .exec((err,post)=>{
        if(err||!post){
            res.json({"error":"nahi mili bhai"})
        }
        if(post.postedBy._id.toString()===req.user._id.toString()){//to ensure delete vahi kar sake jiski post hai
            post.remove()
            .then(result=>{
                res.json({message:"Successfully deleted"})
            }).catch((err)=>{res.json({"error":"nahi hui delete"})})
        }
    })
})


module.exports=router