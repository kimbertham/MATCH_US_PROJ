import React from 'react'

const Swipe = ({ img, title, sub, accept, decline, details }) =>{

  return (
    <div className='flex'>
      <div className='sw fh center column'>
        <div className='m-card-cont' onClick={details}>
          <img 
            alt='poster' className='m-poster'
            src={img}/>
          <h1> {title}, <span> {sub}</span></h1>
        </div>

        <div className='flex'>
          <button className='accept' onClick={()=>{
            accept('True')
          }}> Yes </button>
          <button className='decline' onClick={()=>{
            decline('False')
          }}> No </button>
        </div>  
      </div>  
    </div>
  )
}

export default Swipe