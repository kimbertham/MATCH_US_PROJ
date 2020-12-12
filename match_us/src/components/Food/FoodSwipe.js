import React from 'react'
import axios from 'axios'
import { GImages, fDefault  } from '../../Lib/common'
import { headers } from '../../Lib/auth'

const FoodSwipe = ({ f, selectMatch, nextSwipe, connection }) => {

  const swipeFood = async (d) => {
    const data = { f_id: f.place_id, name: f.name, 
      direction: d, connection: connection.id }
    await  axios.post('/api/food/', data, headers())
    nextSwipe()
  }

  if (!f) return null
  return (
    <>
      <div className='sw fh center column'>
        <div className='f-card-cont s-cont'>

          <div className='f-img' onClick={selectMatch} id={f.place_id}
            style={{ backgroundImage: `url(
            ${f.photos ? `${GImages}${f.photos[0].photo_reference}` :  fDefault})` }}/>
          <h1> {f.name}</h1>
          <p>{f.vicinity}</p>
        </div>

        <div className='flex'>
          <button className='accept' onClick={()=>{
            swipeFood('True')
          }}> Yes </button>
          <button className='decline' onClick={()=>{
            swipeFood('False')
          }}> No </button>
        </div>  
      </div>  
    </>
  )
}
export default FoodSwipe