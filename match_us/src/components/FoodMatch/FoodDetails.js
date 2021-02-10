import React from 'react'
import { GImages } from '../../Lib/common'

const FoodDetails = ({ r, setData }) => {
  return (
    <div className='details fh'>
      <button onClick={e=>{
        e.stopPropagation(),
        setData( { location: r.formatted_address })
      }}> Invite</button> 

      <h1>{r.name}</h1>
      <p> {r.website}</p>
      <p> {r.formatted_address}</p>
      <p> {r.formatted_phone_number}</p>
      <p> {r.opening_hours ? 
        <>
          <p>{r.opening_hours.open_now} </p>
          {r.opening_hours.weekday_text.map((w,i) => <p key={i}> {w}</p>)}
        </> : null}</p>

      <p>{r.price_level}</p>
      <p>{r.rating}</p>
      {r.photos ? r.photos.slice(0,3).map(p => <div key={p.photo_reference} className='d-img'
        style={{ backgroundImage: `url(${GImages}${p.photo_reference})` }}/>) : null}
      {r.reviews ? <p>{r.reviews[0].author_name} {r.reviews[0].rating} {r.reviews[0].text} </p> : null}

    </div>
  )
}
export default FoodDetails