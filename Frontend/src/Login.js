import React from 'react'
import { useState } from 'react'
import Information from './Information'

const Login = (props) => {

    const [email, setEmail] =  useState("") 
    const [password, setPassword] = useState("")
    const [status, setStatus] = useState("success")
    
    const verifyLoginDetails = async() =>{
      const result = await fetch("http://localhost:5000/login",{
        method: "POST",
        headers:{
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          username: email,
          password : password
        })
      })

      const res = await result.json()
      setStatus(res.message)
      
    }
    const handleSubmit = (e) => {
      e.preventDefault()
      verifyLoginDetails()
    }
   
  return (
   
    <div >
     
      {
      status!=="Login succesful!" && 
      <div className='container, formBody'>
        <h2>Login</h2>
    <form className= "form" onSubmit={handleSubmit}>
        <label htmlFor="email">User Name</label>
        <input onChange={(e)=> setEmail(e.target.value)} value = {email} type="email" placeholder="abc@gmail.com" id="email" name="email"/>
        <label htmlFor="password">Password</label>
        <input onChange={(e)=> setPassword(e.target.value)} value = {password} type="password" placeholder="***********" id="password" name="password"/>
        <button className="bt" type="submit">Log In</button>
    </form>
    <button className="link-btn" onClick={()=> props.onFormSwitch("register")}>Don't have an account? Register here.</button> 
    {status!=="success" && status!=="Login succesful!"
      && <b><p style={{color:"red"}}>{status}</p></b>}
    </div>
    } 
    
    <div >
    {status==="Login succesful!"
     && <Information />}
    </div>
    </div>
  )
}

export default Login