/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios'
import { GImages, fDefault } from '../../Lib/common'
import { headers } from '../../Lib/auth'

const FoodSwipe = ({ f, getDetail, connection, checkMatch, deleteMatches, showSearch }) => {

  if (!f) return null


  const swipeFood = async (d) => {
    const img = f.photos ? `${GImages}${f.photos[0].photo_reference}` : ''
    const data = { f_id: f.place_id, name: f.name, 
      direction: d, img , connection: connection.id }
    const r = (await  axios.post('/api/food/', data, headers())).data
    await  d === 'True' ? checkMatch(r.f_id) : null
  }

  return (
    <>
      <div>
        <div style={{ backgroundImage: `url(${f.f_id === 'n' ? f.img : 
          f.photos ? `${GImages}${f.photos[0].photo_reference}` : fDefault}` }}
        className='f-img' onClick={getDetail} id={f.place_id}/>
        <h1> {f.name}</h1>
        <p>{f.vicinity}</p>
      </div>

      <button onClick={()=>{
        deleteMatches()
      }}> Delete </button>
      <div className={f.f_id === 'n' ? 'display-none' : 'flex'}>
        <button className='accept' onClick={()=>{
          swipeFood('True')
        }}> Yes </button>
        <button className='decline' onClick={()=>{
          swipeFood('False')
        }}> No </button>
      </div>  
      <button className='decline' onClick={()=>{
        showSearch()
      }}> Filter </button>
    </>
  )
} 

export default FoodSwipe