import React, { useEffect, useState } from 'react'
import P2 from './ProfilePic.png' 
import P1 from './P2.png' 
import P3 from './P3.jpg' 
import defaultPic from "./NoImage.png"
import EditProfile from './EditProfile'

import CreateProfile from "./CreateProfile"


const Information = () => {
   
   const [data,setData] = useState([])
   const [create, setCreate] = useState("false")
   const [edit, setEdit] = useState("false")
   const [name, setName] = useState()
   const [bio, setBio] = useState()
   const [profileDet, setProfileDet] = useState()
   
   useEffect(()=>{
      
      Data()

   },[create])

   const Data = async ()=>{
         
      const res = await fetch("http://localhost:5000/profiles")
      
      setData(await res.json())
      
   }

   const updatedStatus = () =>{
      setCreate("false");
   }
   
   if(data.length>0){
     data[0].img = P1
     data[1].img = P2
     data[2].img = P3
   }
   return(
   
         <div>
     
           <div className='heading'>
              <center><h1 style={{paddingTop:'5px',paddingBottom:'5px',backgroundColor:"rgb(230, 234, 237)"}}>User Profiles</h1></center>
           </div>

           {create==="false" && <button style= {{paddingLeft:"35px"}} onClick={()=>setCreate("true")}>Add Profile</button>}

           { create==="false" && data.map(profile => {
            
            if(profile.img === undefined){
                profile.img = defaultPic
            }
             
              return (
               
                 <div className='body' >
                   
                   <div className='display'>
                     <div>
                         <img src={profile.img} alt=" "  className="rounded-circle"></img>
                    </div>
                  <div style={{display:"flex",flexDirection : "row"}}>
                   <div className='info'>
                     
                      <div className='title'>
                           <h1>{profile.name}</h1>
                      </div> 
                  
                     
                   <div className='description'>
                            <p>{profile.bio}</p> 
                   </div>
                   
                   </div>
                  
                   </div>

                  </div>

                      <hr style={{height:'5px',borderWidth:'0',backgroundColor:'black'}}></hr>
                  </div>
          )
        }
   )}
       {create=== "true" &&
           <div className='profile'>
               <CreateProfile getStatus = {updatedStatus}/>
           </div>
           }

       </div>
   )
}

export default Information
