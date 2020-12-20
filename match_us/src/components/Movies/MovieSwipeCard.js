import React from 'react'
import { poster }  from '../../Lib/common'

const MovieSwipeCard = ({ toggleDetails,swipeMovie, m }) => {
  return (
    <>
      <div className='m-card-cont' onClick={toggleDetails}>
        <img 
          alt='poster' className='m-poster'
          src={`${poster}${m.poster_path}`}/>
        <h1> {m.title}, <span> {m.release_date.slice(0,4)}</span></h1>
      </div>

      <div className='flex'>
        <button className='accept' onClick={()=>{
          swipeMovie('True')
        }}> Yes </button>
        <button className='decline' onClick={()=>{
          swipeMovie('False')
        }}> No </button>
      </div>  
    </>
  )
}
export default MovieSwipeCard