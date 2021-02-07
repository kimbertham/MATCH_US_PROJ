import React from 'react'
import { poster } from '../../Lib/common'

const MovieDetails = ({ r, setData }) => {
  return (
    <>
      <button onClick={e=>{
        e.stopPropagation(),
        setData( { notes: `${r.title}, ${r.release_date}`, type: 'film' })
      }}> Invite</button> 
      
      <img 
        alt='poster' className='m-poster' src={`${poster}${r.poster_path}`}/>
      <h1>{r.release_date}</h1>
      <h1>{r.title} </h1>
      <h1>{r.tagline} </h1>
      <p>{r.overview} </p>
      <h1> {r.homepage}</h1>
      <p>{r.production_companies.map(x=> x.name )}</p>
      <p>{r.vote_average}</p>
      <p>{r.runtime} mins </p>
      {r.genres ? r.genres.map(g=> g.name) : null }
    </>
  )
}
export default MovieDetails