import React from 'react'
import { GImages, poster } from '../../Lib/common'

const ActivityCard = ({ r, section,like, i }) => {
  if (!r) return null

  const google = () => {
    return (
      <>
        <div className='l-img-cont'>
          <img src={  r.photos ? `${GImages}${r.photos[0].photo_reference}` : 'https://bit.ly/2LG7Z7k'} className='list-img' alt='img'/>
        </div>

        <div className='l-text'>
          <h1>{r.name}</h1>
          <h3>Rating: {r.rating}/5</h3>
          <h3>Address: {r.vicinity}</h3>
          <h3>{r.opening_hours ? r.opening_hours.open_now ? 'Status: Open' : 'Status: Closed' : null} </h3>
        </div>
      </>
    )
  }

  const movies = () => {
    return (
      <>
        <img src={`${poster}${r.poster_path}` } alt='img' className='lm-img'/>
        
        <div className='l-text'>
          <h1> {r.title}</h1>
          <p>{r.vote_average}/10</p>
          <p>{r.release_date}</p>
          <p>{r.overview}</p>
        </div>
      </>
    )
  }

  return (
    <div className='l-field'>
      {section === 'movies' ? movies() : google()}

      <p className='l-button' onClick={()=>{
        like('True', i) 
      }}>{!r.like ? '♡' : '♥'}</p>
    </div>
  )
}
export default ActivityCard