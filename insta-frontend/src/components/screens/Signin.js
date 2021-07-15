import React,{useState,useContext} from 'react'
import './Signin.css'
import {Link,useHistory} from 'react-router-dom'
import {userContext} from './../../App'
function Signin() {
    const {state,dispatch}=useContext(userContext)
    const history=useHistory()
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
     
    const PostData=()=>{
        fetch("http://localhost:8000/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                "email":email,
                "password":password
            })
        }).then(res=>res.json())
        .then((data)=>{
            if(data.error){
                window.alert(data.error)
            }else{
                //store token in localStorage to be used
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                //if signin successfull then navigate to sigin screen using useHistory hook from react-router-dom
                dispatch({type:"USER",payload:data.user})
                window.alert("Signed in successfully")
                console.log(data)
                history.push("/home")
            }
        })
        .catch((err)=>console.log(err))
    }


    return (
        <div className="signinContainer">
            <img src="https://www.pngitem.com/pimgs/m/189-1899206_transparent-iphone-x-instagram-png-png-download.png" 
            alt="Photos"
            className="phoneImg"></img>
            <div className="cards">
            <div className="card">
            <h2>Instagram</h2>
            <input type="text" 
            placeholder="Email"
            value={email}
            onChange={((e)=>setEmail(e.target.value))}
            />
            <input type="password" 
            placeholder="Password"
            value={password}
            onChange={((e)=>setPassword(e.target.value))}
            />
            <button className="submitBtn" onClick={()=>PostData()}>Log In</button>
            </div>
            <div className="card2">
                <h4>Don't have an account?<Link to='/signup' className="signupLink"> Sign Up</Link></h4>
            </div>
            </div>
        </div>
    )
}

export default Signin
