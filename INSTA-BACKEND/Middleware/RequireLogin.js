const jwt=require('jsonwebtoken')
const JWT_SECRET_KEY="wicw09e2fheofhq3hg3"//random same as in auth
const mongoose=require('mongoose')
const UserCollection=require('../Models/Schema')
const RequireLogin=(req,res,next)=>{
let {authorization}=req.headers
//authorization = Bearer token(that was created)
if(!authorization){//if auth is not present
    res.status(401).send('You are not authorized')
}else{
    authorization=authorization.replace("Bearer ","")//extracting token from auth
    
    jwt.verify(authorization,JWT_SECRET_KEY,(err,payload)=>{//to verify whether the token is correct or not
     if(err){
        return res.status(401).send("Galat token")
     }else{
        const {_id}=payload//get the _id we used in auth for jwt tokens
        console.log(_id)
        UserCollection.findById(_id)
        .then((userData)=>{
            req.user=userData
            next()
        })
     }
    })
}

}
module.exports=RequireLogin