/* eslint-disable no-unused-vars */
import React from 'react'
import { GImages, fDefault, poster } from '../../Lib/common'
import heart from '../../styles/assets/swipe-buttons/heart.jpg'
import cross from '../../styles/assets/swipe-buttons/cross.jpg'
import restart from '../../styles/assets/swipe-buttons/restart.jpg'
import filter from '../../styles/assets/swipe-buttons/filter.jpg'



const MatchSwipe = ({ r,  deleteMatches, showSearch ,swipe, getDetail, section }) => {
  if (!r) return null

  const foodSwipe = () => {
    const img = r.photos ? `${GImages}${r.photos[0].photo_reference}` : fDefault
    
    return (
      <>
        <div style={{ backgroundImage: `url(${ img })` }}
          className='swipe-img' onClick={getDetail} id={r.place_id}/>
        <h1> {r.name.length > 20 ? `${r.name.slice(0,20)}..` : r.name }</h1>
        <p>{r.vicinity}</p>
      </>
    )
  }

  const movieSwipe = () => {
    return (
      <>
        <div style={{ backgroundImage: `url(${ `${poster}${r.poster_path}` })` }}
          className='swipe-img' onClick={getDetail} id={r.id}/>
        <h1> {r.title.length > 20 ? `${r.title.slice(0,20)}..` : r.title }</h1>
        <p>{r.release_date}</p>
      </>
    )
  }

  return (
    <>   


      <div className=' swipe-layer1'>
        <div className='swipe-card'>
          {section === 'movies' ? movieSwipe() : foodSwipe()}
        </div>
      </div>

      <div className='s-buttons'>
        <img src={restart} className='s-button s-opt' alt='restart' onClick={()=>{
          deleteMatches()
        }}/>
        <img src={heart} className='s-button s-dir' alt='like' onClick={()=>{
          swipe('True')
        }}/>
        <img src={cross} className='s-button s-dir' alt='decline' onClick={()=>{
          swipe('False')
        }}/>            
        <img src={filter} className='s-button s-opt' alt='filter' onClick={()=>{
          showSearch()
        }}/>
      </div>
    </>
  )
} 

export default MatchSwipe