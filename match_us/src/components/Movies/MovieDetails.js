import React from 'react'
import { poster } from '../../Lib/common'
import { withRouter, Link } from 'react-router-dom'

const MovieDetails = ({ r, setData, delMatch, match }) => {

  return (
    <div className='details sw fh'>

      <div className='details-bg absolute sw'  
        style={{ backgroundImage: `url(${poster}${r.poster_path})` }}/>
      
      <div className='fh row center'>

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
          <Link to={r.homepage}>{r.homepage}</Link>

          <div className='flex-end detail-buttons' onClick={e=>{
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