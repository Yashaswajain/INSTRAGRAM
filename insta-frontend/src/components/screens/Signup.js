import React,{useState}from 'react'
import './Signup.css'
import {useHistory} from 'react-router-dom'
function Signup() {
    const history=useHistory()
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const PostData=()=>{
        fetch("http://localhost:8000/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                "name":name,
                "email":email,
                "password":password
            })
        }).then(res=>res.json())
        .then((data)=>{
            if(data.error){
                window.alert(data.error)
            }else{
                //if signup successfull then navigate to sigin screen using useHistory hook from react-router-dom
                window.alert(data.message)
                history.push("/signin")
            }
        })
        .catch((err)=>console.log(err))
    }
    return (
        <div className="signupContainer">
            <h2>Instagram</h2>
            <input type="text" 
            placeholder="Email or phone number"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <input type="text" 
            placeholder="Full Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            />
            <input type="password" 
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
            <button
            className="submitSignup"
            onClick={()=>PostData()}>Sign Up</button>
        </div>
    )
}

export default Signup
