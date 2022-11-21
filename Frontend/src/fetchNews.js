import React from 'react'
import { Link } from 'react-router-dom'
import Data from './Sample_Report.json'


const fetchNews = () => {
  return (

    <div>
    <div className='heading'>
         <center><h1 style={{paddingTop:'5px',paddingBottom:'5px',backgroundColor:"rgb(230, 234, 237)"}}>LATEST NEWS</h1></center>
      </div>
    <div className='body'>
     
    <div style={{paddingLeft:'25px'}}>
       <Link to='/'>Go back to Home</Link>
    </div>
    
    {Data.results.map((newsItem,index)=>{
    return( 
    <div key={index} className='newsContent'>
       <h3 className='article'>{newsItem.title}</h3>
       <a href={newsItem.link} className='article'>Know more</a>
     </div>)
     })}
    
    </div>
    </div>
  )
}

export default fetchNews
