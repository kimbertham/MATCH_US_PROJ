/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios'
import { GImages } from '../../Lib/common'
import { headers } from '../../Lib/auth'

const FoodSwipe = ({ f, selectMatch, nextSwipe, connection, checkMatch }) => {

  if (!f) return null

  const img = f.photos ? `${GImages}${f.photos[0].photo_reference}` : null

  const swipeFood = async (d) => {
    const data = { f_id: f.place_id, name: f.name, 
      direction: d, img: img , connection: connection.id }
    const r = (await  axios.post('/api/food/', data, headers())).data
    d === 'True' ? checkMatch(r.f_id) : null
    nextSwipe()
  }

  return (
    <>
      <div className='sw fh center column'>
        <div className='f-card-cont s-cont'>

          <div className='f-img' onClick={selectMatch} id={f.place_id}
            style={{ backgroundImage: `url(${f.f_id === 'n' ? f.img : img})` }}/>
          <h1> {f.name}</h1>
          <p>{f.vicinity}</p>
        </div>

        <div className={f.f_id === 'n' ? 'display-none' : 'flex'}>
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