import React, { useState } from 'react'

const EditProfile = (props) => {

    const [name, setName] = useState(props.name)
    const [bio, setBio] = useState(props.bio)
    

const editProfile = async() =>{
    const result = await fetch("http://localhost:5000/updateProfile",{
      method: "PUT",
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        name:name,
        bio: bio,
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
    editProfile()
  }

  return (
    <div className='profile'>
        <form className= "form" onSubmit={handleSubmit}>
        <label htmlFor="name">Full Name</label>
        <input onChange={(e)=> setName(e.target.value)} value = {name} name = "name" id="name" placeholder="Full name"></input>
        <label htmlFor="bio">Bio</label>
        <input onChange={(e)=> setBio(e.target.value)} value = {bio} name = "bio" id="bio" placeholder="Bio"></input>
        <label htmlFor="image">Upload Image</label>
        <input type="file" id="image" name="image" accept="image/png, image/jpeg"/>
        <button className="bt" type="submit">Update</button>
        </form>
    </div>
  )
}

export default EditProfile