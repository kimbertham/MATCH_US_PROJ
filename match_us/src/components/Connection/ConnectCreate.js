import React from 'react' 
import axios from 'axios'

const ConnectCreate = ({ c , getCons }) => {

  const request = async (id, dir) => {
    if (dir) {
      await  axios.patch(`/api/connections/${id}/`)
    } else {
      await axios.delete(`/api/connections/${id}/`)
    }
    getCons()
  } 

  return (
    <div className='req-item'>

      <div className='flex'>
        
        <div className='img-wrap'>
          <div className='l-cont'>
            <div  className='m-img' style={{ backgroundImage: `url(${c.participants.profile_image})` }}/>
          </div>
        </div>

        <div>
          <h3>{c.participants.first_name} {c.participants.last_name}  
            <span className='req-span'> @{c.participants.username}</span>
          </h3>
          <small>{c.participants.email}</small>
        </div>
      </div>

      <div className='req-buttons'>
        <button className='button' onClick={()=>{
          request(c.id, true)
        }}> ✓ </button>
        <button className='button' onClikc={()=>{
          request(c.id, false)        
        }} >✗</button>
      </div>

    </div>
  )
}
export default ConnectCreate