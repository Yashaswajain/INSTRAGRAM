const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema.Types//to connect this postSchema to user Schema
const postSchema=new mongoose.Schema({
    caption:{
        type:String,
        required:true
    },
    photo:{
    type:String,
    required:true
    },
    likes:[{type:ObjectId,ref:"User"}],
    comments:[{
        type:String,
        postedBy:{"type":ObjectId,"ref":"User"}
    }],
    postedBy:{//to build relation b/w schemas
        type:ObjectId,
        ref:"User"//name of the collection to refer to
    }
},{timestamps:true})

const newCollection=new mongoose.model('Post',postSchema)
module.exports=newCollection