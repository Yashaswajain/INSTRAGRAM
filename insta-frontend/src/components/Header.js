import React,{useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import './Header.css'
import {Avatar} from '@material-ui/core'
import {userContext} from './../App'
function Header() {
    const {state,dispatch}=useContext(userContext)
    const history=useHistory()
    const renderList=()=>{
        if(state){//state has user info
          return [
            <Link className="Profile right_ele" to="/profile">
            <Avatar src="https://images.unsplash.com/photo-1591084728795-1149f32d9866?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"></Avatar>
            </Link>,
            <Link className="Signup right_ele" to="/createPost">
            Post
            </Link>,
            <Link className="Signup right_ele" onClick={()=>{//logout functionality
                localStorage.clear()
                dispatch({type:"CLEAR"})
                history.push("/signin")
                return [
                <Link className="Signin right_ele" to="/signin">
                SignIn
                </Link>,
                <Link className="Signup right_ele" to="/signup">
                SignUp
                </Link>
                ] 
            }}
           >
            SignOut
            </Link>
          ]
        }else{
            return [
                <Link className="Signin right_ele" to="/signin">
                SignIn
                </Link>,
                <Link className="Signup right_ele" to="/signup">
                SignUp
                </Link>
            ]
        }
    }
    return (
        <header className="header">
            <div className="left_header">
            <Link className="Home" to={state?'/home':'/signin'}>Instagram</Link>
            </div>
            <div className="center_header">
                <input type="text" name="input" className="header_input" placeholder="Search"></input>
            </div>
            <div className="right_header">

                {renderList()}
                 
                {/* <Link className="Profile right_ele" to="/profile">
                <Avatar src="https://images.unsplash.com/photo-1555952517-2e8e729e0b44?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHBlcnNvbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"></Avatar>
                </Link>
                <Link className="Signin right_ele" to="/signin">
                SignIn
                </Link>
                <Link className="Signup right_ele" to="/signup">
                SignUp
                </Link>
                <Link className="Signup right_ele" to="/createPost">
                Post
                </Link> */}
            </div>
        </header>
    )
}

export default Header
