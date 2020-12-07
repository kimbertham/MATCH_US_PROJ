import React from 'react'
import { poster } from '../../Lib/common'

const MovieDetails = ({ details }) => {


  if (!details) return null
  return (
    <div className='modal'>
      <div className='m-pop'>
        <div>
          <h1>{details.title}</h1>
          <img 
            alt='poster' className='m-poster'
            src={`${poster}${details.poster_path}`}/>
          {details.overview}
        </div>
      </div>
    </div>
  )
}

export default MovieDetails