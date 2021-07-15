import React ,{useState}from 'react'
import './CreatePost.css'
import {useHistory} from 'react-router-dom'
function CreatePost() {
    const history=useHistory()
    const [caption,setCaption]=useState("")
    const [imageURL,setImageURL]=useState("")
    const [image,setImage]=useState("")
    //uploading image on cloudinary
    const postDetails=()=>{
    const data=new FormData()
    data.append("file",image)
    data.append("upload_preset","insta-clone")
    data.append("cloud_name","yashaswajain")
    fetch("https://api.cloudinary.com/v1_1/yashaswajain/image/upload",{
        method:"post",
        body:data
    }).then(res=>res.json())
    .then(data=>{console.log("Image upload successfull")
          setImageURL(data.url)

          //save post to mongo
          fetch("http://localhost:8000/createpost",{
              method:"post",
              headers:{
                  "Content-type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
              caption:caption,
              url:imageURL
            })
           }).then(res=>res.json())
             .then(data=>{
                  if(data.error){
                     window.alert(data.error)
                  }else{
                    window.alert(data.message)
                    history.push("/home")
                  }
             })
             .catch(err=>console.log(err))
     })
    .catch(err=>console.log(err))
    
    }
    



    return (
        <div className="createPostContainer">
            <input type="file" 
            id="inputFile"
            onChange={(e)=>setImage(e.target.files[0])}
            />
            <label htmlFor="inputFile" className="inputFile">Upload Photo</label>
            <div className="lowerCreatePostContainer">
                <input type="text"
                 placeholder="Add a caption" 
                 className="caption"
                 value={caption}
                 onChange={(e)=>setCaption(e.target.value)}
                />
                <button className="post"
                onClick={()=>postDetails()}>POST</button>
            </div>
        </div>
    )
}

export default CreatePost
