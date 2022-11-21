import React from 'react'
import { useState } from 'react'
import Information from './Information'

const Register = (props) => {
    const [email, setEmail] =  useState("") 
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [status, setStatus] = useState("success")

    const verifySignUpDetails = async() =>{
      const result = await fetch("http://localhost:5000/register",{
        method: "POST",
        headers:{
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          name:name,
          email: email,
          password : password
        })
      })

      const res = await result.json()
      setStatus(res.message)
      
    }
    const handleSubmit = (e) => {
      e.preventDefault()
      verifySignUpDetails()
    }
   
      
      
  return (
    <div>

      {
      status!=="User added succesfully" &&
    <div className='container, formBody'>
         <h2>Register</h2>
    <form className= "form" onSubmit={handleSubmit}>
        <label htmlFor="name">Full Name</label>
        <input onChange={(e)=> setName(e.target.value)} value = {name} name = "name" id="name" placeholder="Full name"/>
        <label htmlFor="email">User Name</label>
        <input onChange={(e)=> setEmail(e.target.value)} value = {email} type="email" placeholder="abc@gmail.com" id="email" name="email"/>
        <label htmlFor="password">Password</label>
        <input onChange={(e)=> setPassword(e.target.value)} value = {password} type="password" placeholder="**********" id="password" name="password"/>
        <button className="bt" type="submit">Register</button>
    </form>
    <button className="link-btn" onClick={()=> props.onFormSwitch("login")}>Already have an account? Login here.</button>
    {status!=="success" && status!=="User added succesfully"
      && <b><p style={{color:"red"}}>{status}</p></b>}
    </div>
    }

    <div>
    {status==="User added succesfully"
     && <Information />}
    </div>
    </div>
  )
}

export default Register