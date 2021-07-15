import React,{useEffect,createContext,useReducer,useContext}from 'react'
import './App.css';
import Header from './components/Header'
import {BrowserRouter,Route,useHistory} from 'react-router-dom'
import Home from './components/screens/Home'
import Profile from './components/screens/Profile'
import Signup from './components/screens/Signup'
import Signin from './components/screens/Signin'
import CreatePost from './components/screens/CreatePost'
import UserProfile from './components/screens/UserProfile'
import {reducer,initialState} from './Reducers/useReducer'
export const userContext=createContext()

const Routing=()=>{//we can access history in this 
  const history=useHistory()
  const {state,dispatch}=useContext(userContext)
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"))
    if(localStorage.getItem("jwt")){//if signed in then go to home
      dispatch({type:"USER",payload:user})
       history.push("/home")
    }else{//else go to signin screen
      history.push("/signin")
    }
  },[])
  return (
  <>
      <Route path="/home">
      <Home/>
      </Route>
      <Route path="/profile">
      <Profile/>
      </Route>
      <Route path="/signin">
      <Signin/>
      </Route>
      <Route path="/signup">
      <Signup/>
      </Route>
      <Route path="/createPost">
      <CreatePost/>
      </Route>
      <Route path="/user/:userid">
      <UserProfile/>
      </Route>
  </>
  )
}
function App() {//we cannot access history in this so making Routing
const [state,dispatch]=useReducer(reducer,initialState)
  return (
    <userContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <Header/>
      <Routing/>
    </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
