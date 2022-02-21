import React from 'react' 
import axios from 'axios'

const ConnectCreate = ({ c , getCons,id }) => {

  const request = async (dir) => {
    if (dir) {
      await  axios.patch(`/api/connections/${id}/`, { request: null })
    } else {
      await axios.delete(`/api/connections/${id}/`)
    }
    getCons()
  } 

  if (!c) return null
  return (
    <div className='req-item'>

      <div className='flex'>
        
        <div className='img-wrap'>
          <div className='l-cont'>
            <div  className='m-img' style={{ backgroundImage: `url(${c.profile_image})` }}/>
          </div>
        </div>

        <div>
          <h3>{c.first_name} {c.last_name}  
            <span className='req-span'> @{c.username}</span>
          </h3>
          <small>{c.email}</small>
        </div>
      </div>

      <div className='req-buttons'>
        <button className='button' onClick={()=>{
          request( true)
        }}> ✓ </button>
        <button className='button' onClick={()=>{
          request( false)        
        }} >✗</button>
      </div>

    </div>
  )
}
export default ConnectCreate