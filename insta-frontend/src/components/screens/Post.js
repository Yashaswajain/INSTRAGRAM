import React,{useState,useEffect}from 'react'
import './Post.css'
import FavoriteIcon from '@material-ui/icons/Favorite'
import {Link} from 'react-router-dom'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import DeleteIcon from '@material-ui/icons/Delete'
import {Avatar} from '@material-ui/core'
function Post({name,profileSrc,imgSrc,caption,postId,postedById}) {
   const [areEqual,setAreEqual]=useState(false)
   useEffect(()=>{
        
        console.log(typeof(localStorage.getItem("user")))
        const localId=JSON.parse(localStorage.getItem("user"))
       if(postedById==localId._id){
           setAreEqual(true)
       }
   },[])
    const deletePost=function(postId){
        fetch(`http://localhost:8000/deletepost`,{
            method:'delete',
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt"),
                
            },
            body:JSON.stringify({
                postId:postId
            })
        }).then(res=>res.json())
        .then((result)=>{
            console.log(typeof(result))
            if(result.err){
               
                console.log(result.err)
            }else{
                window.alert("Successfully deleted")
                window.location.reload()
               console.log(result.message)
            }
        })

    }


    return (
        <div className="postCard">
            <div className="upperPost">
            <Avatar src={profileSrc} className="profileSrc"></Avatar>
            <Link to={"/user/"+postedById}>
                <h4>{name}</h4>
            </Link>
            </div>
            <img src={imgSrc} className="postImg" alt="imageDisp"></img>
            <div className="lowerPost">
              <div className="likesDiv">
              <FavoriteIcon 
              style={{"color":"red"}} 
              className="likeIcon"
              />
              <h4 className="unlikeIcon">{/*to show only user ki posts*/}
              {areEqual&&<DeleteIcon
              onClick={()=>deletePost(postId)}
              />}
              
              </h4>
              
              
              <p>0 likes</p>
              </div>
              <div className="captionDiv">
                  <h4 className="name">{name}</h4>
                  <p>{caption}</p>
              </div>
              <div className="commentDiv">
              <input type="text" placeholder="Add a comment"></input>
              <button type="submit" >Post</button>
              </div>
            </div>
        </div>
    )
}

export default Post
