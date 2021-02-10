import React from 'react'
import { poster } from '../../Lib/common'
import { withRouter } from 'react-router-dom'

const MovieDetails = ({ r, setData, match }) => {

  return (
    <div className='details sw fh'>
      <div className='details-bg sw'  style={{ backgroundImage: `url(${poster}${r.poster_path})` }}/>

      <div className='flex wrap fh center'>
        <img alt='poster' className='d-m-img' src={`${poster}${r.poster_path}`}/>
        <div className='d-m-text'>
          <h1>{r.title}</h1> <h3>{r.release_date}</h3> 
          <br/>
          <h2>{r.tagline} </h2>
          <p>{r.overview} </p>
          <br/>
          <p> Production : {r.production_companies.map(x=> `${x.name} | ` )}</p>
          <br/>
          <p>{r.vote_average}/10</p>
          <p>{r.runtime} Mins </p>
          <p> {r.genres ? r.genres.map(g=> `${g.name} | `) : null }</p>
          
          <a href={r.homepage}> {r.homepage}</a>
          {match.path.includes('results') ? 
            <button className='invite-button' onClick={e=> {
              e.stopPropagation(),
              setData( { notes: `${r.title}, ${r.release_date}`, type: 'film' })
            }}> + Create Date</button> : null}
        </div>

      </div>
    </div>

  )
}
export default withRouter(MovieDetails)