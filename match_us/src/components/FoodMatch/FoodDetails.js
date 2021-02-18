import React from 'react'
import { GImages } from '../../Lib/common'
import { withRouter, Link } from 'react-router-dom'

const FoodDetails = ({ r, setData, match, delMatch }) => {

  return (
    <div className='details sw fh scroll'>

      <div className='details-bg cover sw' 
        style={{ backgroundImage: `url(${r.photos ?
          `${GImages}${r.photos[0].photo_reference}` : null})` }}/>
      
      
      <div className='center row'>
    
        {r.photos ? <img className='d-g-img' src={`${GImages}${r.photos[0].photo_reference}`}/> : null}

        <div className='d-g-text'>
          <h1>{r.name}</h1>
          <small> {r.formatted_phone_number} {'£'.repeat( r.price_level)}</small>
          <Link to={r.website}>{r.website} </Link>
          <p> {r.formatted_address}</p>
          <br/>

          <h3>Average Rating: {r.rating}/5 </h3>
          <p>Customer Reviews:</p>
          {r.reviews ? r.reviews.slice(0,3).map(r => {
            return <>
              <p key={r.time}> <b>{r.author_name}</b>:  {r.rating}/5</p>
              <p>{r.text}</p> </>
          }) : null}
          <br/>

          {r.opening_hours ? 
            <>
              <h3>Opening Hours</h3>
              <p>{r.opening_hours.open_now} </p>
              {r.opening_hours.weekday_text.map((w,i) => <p key={i}> {w}</p>)}
            </>
            : null}
    
          <div className='flex-end detail-buttons'>
            {match.path.includes('results') ? 
              <>
                <button onClick={e=>{
                  setData( e, { location: r.formatted_address })
                }}> + Create Date</button> 
                <button onClick={e=> {
                  delMatch(e, r.place_id)
                }}> Delete</button>
                <button> Mark As Complete</button>
              </> : null}
          </div>

        </div>
      </div>
    </div>

  )
}
export default withRouter(FoodDetails)