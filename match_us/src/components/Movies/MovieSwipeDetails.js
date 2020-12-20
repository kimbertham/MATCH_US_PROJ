import React from 'react'
import { poster } from '../../Lib/common'

const MovieSwipeDetails = ({ details, toggleDetails }) => {

  if (!details) return null
  return (
    <>
      <h1 onClick={toggleDetails} className='pointer right'> x</h1>
      <br/>
      <h1> {details.title}</h1>
      <h2>{details.tagline}</h2>
      <img src={`${poster}${details.poster_path}`} alt='poster'/>
      <h1> {details.vote_average}</h1>
      <h2>{details.release_date}</h2>
    
      {details.genres ? details.genres.map(g=> g.name) : null }
      <p>{details.overview}</p>
      {details.original_language}
    </>
  )
}

export default MovieSwipeDetails