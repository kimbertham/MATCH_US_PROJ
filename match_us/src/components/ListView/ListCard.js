import React from 'react'
import { GImages, poster } from '../../Lib/common'

const ActivityCard = ({ r, section,like, i }) => {
  console.log(r)
  if (!r) return null

  const google = () => {
    return (
      <>
        <div className='list-img-cont center'>
          <img src={  r.photos ? `${GImages}${r.photos[0].photo_reference}` : 'https://bit.ly/2LG7Z7k'} className='list-img' alt='img'/>
        </div>
        <div className='list-text'>
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
        <img src={`${poster}${r.poster_path}` } alt='img' className='m-list-img'/>
        <div className='list-text'>
          <h1> {r.title}</h1>
          <p>{r.vote_average}/10</p>
          <p>{r.release_date}</p>
          <p>{r.overview}</p>
        </div>
      </>
    )
  }

  return (
    <div className='list-field flex'>
      {section === 'movies' ? movies() : google()}
      
      <button className='list-button' onClick={()=>{
        like('True', i) 
      }}> Like </button>

    </div>
  )
}
export default ActivityCard