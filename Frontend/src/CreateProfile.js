import React, { useState } from 'react'

const CreateProfile = (props) => {

    const [name, setName] = useState("")
    const [bio, setBio] = useState("")
    const [image, setImage] = useState("")

const profileCreation = async() =>{
    const result = await fetch("http://localhost:5000/post",{
      method: "POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        name:name,
        bio: bio,
        image : image
      })
    })

    const res = await result.json()
    if(res.message==="Profile created")
    {
        props.getStatus("false")
    }
    
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    profileCreation()
  }

  return (
    <div className='profile'>
        <form className= "form" onSubmit={handleSubmit}>
        <label htmlFor="name">Full Name</label>
        <input onChange={(e)=> setName(e.target.value)} value = {name} name = "name" id="name" placeholder="Full name"/>
        <label htmlFor="bio">Bio</label>
        <input onChange={(e)=> setBio(e.target.value)} value = {bio} name = "bio" id="bio" placeholder="Bio"/>
        <label htmlFor="image">Upload Image</label>
        <input type="file" id="image" name="image" accept="image/png, image/jpeg"/>
        <button className="bt" type="submit">Create</button>
        </form>
    </div>
  )
}

export default CreateProfile