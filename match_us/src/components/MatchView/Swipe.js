/* eslint-disable no-unused-vars */
import React from 'react'
import { GImages, fDefault, poster } from '../../Lib/common'


const MatchSwipe = ({ r,  deleteMatches, showSearch ,swipe, getDetail, section }) => {
  if (!r) return null

  const foodSwipe = () => {
    const img = r.photos ? `${GImages}${r.photos[0].photo_reference}` : fDefault
    
    return (
      <>
        <div style={{ backgroundImage: `url(${ img })` }}
          className='f-img' onClick={getDetail} id={r.place_id}/>
        <h1> {r.name}</h1>
        <p>{r.vicinity}</p>
      </>
    )
  }

  const movieSwipe = () => {
    return (
      <>
        <div style={{ backgroundImage: `url(${ `${poster}${r.poster_path}` })` }}
          className='f-img' onClick={getDetail} id={r.id}/>
        <h1> {r.title}</h1>
        <p>{r.release_date}</p>
      </>
    )
  }

  return (
    <>   
      {section === 'movies' ? movieSwipe() : foodSwipe()}

      <button onClick={()=>{
        deleteMatches()
      }}> Delete </button>
      <div className={r.f_id === 'n' ? 'display-none' : 'flex'}>
        <button className='accept' onClick={()=>{
          swipe('True')
        }}> Yes </button>
        <button className='decline' onClick={()=>{
          swipe('False')
        }}> No </button>
      </div>  
      <button className='decline' onClick={()=>{
        showSearch()
      }}> Filter </button>
    </>
  )
} 

export default MatchSwipe