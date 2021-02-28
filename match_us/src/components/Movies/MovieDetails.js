import React from 'react'
import { poster } from '../../Lib/common'
import { withRouter, Link } from 'react-router-dom'

const MovieDetails = ({ r, setData, delMatch, match }) => {

  return (
    <div className='details'>

      <div className='d-bg'  
        style={{ backgroundImage: `url(${poster}${r.poster_path})` }}/>
      
      <div className='m-details'>

        <img alt='poster' src={`${poster}${r.poster_path}`}/>
        <div className='text'>
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
          <Link to={r.homepage}>{r.homepage}</Link>

          <div className='d-buttons' onClick={e=>{
            e.stopPropagation()
          }}>
            
            {match.path.includes('results') ? 
              <>
                <button className='button' onClick={()=> {
                  setData( { notes: `${r.title}, ${r.release_date}`, date_type: '🍿 Film' })
                }}> + Create Date</button> 
                <button className='button' onClick={()=> {
                  delMatch( r.id)
                }}> Delete</button>
              </> : null}
        
          </div>
        </div>
      </div> 

    </div>

  )
}
export default withRouter(MovieDetails)