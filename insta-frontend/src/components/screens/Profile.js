import React,{useState,useEffect} from 'react'
import {Avatar} from '@material-ui/core'
import './Profile.css'
function Profile() {
    const [data,setData]=useState([])
    const [currentUser,setCurrentUser]=useState({})
    const [imageURL,setImageURL]=useState("")
    const [image,setImage]=useState("")
    useEffect(()=>{
        fetch("http://localhost:8000/mypost",{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then((result)=>{
            setData(result)
            console.log(data)
            setCurrentUser(JSON.parse(localStorage.getItem("user")))
            
        })

    },[])
    
    return (
        <div className="profileContainer">
        <div className="upperProfile">
            <div className="profilePicture">
            <Avatar className="profilePhoto" fontsize="large"
            src="https://images.unsplash.com/photo-1591084728795-1149f32d9866?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"></Avatar>
            </div>
           
            <div className="upperRight">
            <h1 className="username">{currentUser.name}</h1>
            <div className="stats">
                <h5 className="posts">{data.length} posts</h5>
                <h5 className="followers">0 followers</h5>
                <h5 className="following">0 following</h5>
            </div>
            {/*<h5 className="name">{currentUser.name}</h5>*/}
            </div>
        </div>

        <div className="lowerProfile">

           {data.map((element)=>{
                return <img alt="imageDisp" src={element.photo}></img>
           })}
            
           
        </div>
        </div>
    )
}

export default Profile
