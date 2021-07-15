import React,{useState,useEffect,useIsMounted} from 'react'
import {Avatar} from '@material-ui/core'
import { useParams } from 'react-router-dom'
import './UserProfile.css'
function UserProfile() {
    const [profile,setProfile]=useState({})
    const {userid}=useParams()//to get the parameters

   
    
    useEffect(()=>{
        fetch(`http://localhost:8000/user/${userid}`,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        })
        .then(res=>res.json())
        .then((result)=>{
                
                setProfile(result)
                
            console.log(profile)
        })
        .catch((err)=>console.log(err))
    },[])

    return (
        <div className="profileContainer">
        
        <div className="upperProfile">
            <div className="profilePicture">
            <Avatar className="profilePhoto" fontsize="large"
            src="https://images.unsplash.com/photo-1555952517-2e8e729e0b44?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHBlcnNvbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"></Avatar>
            </div>
            <div className="upperRight">
            <h1 className="username">{/*profile.user.name*/}</h1>
            <div className="stats">
                <h5 className="posts">{/*profile.posts.length*/} posts</h5>
                <h5 className="followers">0 followers</h5>
                <h5 className="following">0 following</h5>
            </div>
            {/*<h5 className="name">{currentUser.name}</h5>*/}
            </div>
        </div>

        <div className="lowerProfile">

           {/*{profile.posts.map((element)=>{
               console.log(element)
                return <img alt="imageDisp" src={element.photo}></img>
           })}*/}
            
           
        </div>
        </div>
    )
}

export default UserProfile
