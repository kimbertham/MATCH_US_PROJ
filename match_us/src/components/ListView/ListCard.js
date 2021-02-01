import React from 'react'
import { GImages, poster } from '../../Lib/common'

const ActivityCard = ({ r, section }) => {

  if (!r) return null

  const google = () => {
    const image =  r.photos ? `'${GImages}${r.photos[0].photo_reference}'` : 'https://bit.ly/2LG7Z7k'
    return (
      <>
        <div  style={{ backgroundImage: `url(${image})` }} className='activity-img'/>
        <h1>{r.name}</h1>
        <h2>{r.rating}</h2>
        <h2>{r.vicinity}</h2>

        <h2>{r.opening_hours ? r.opening_hours.open_now ? 'open' : 'closed' : null} </h2>
      </>
    )
  }

  const movies = () => {
    return (
      <>
        <div  style={{ backgroundImage: `url(${ `${poster}${r.poster_path}` })` }} className='activity-img'/>
        <h1> {r.title}</h1>
        <p>{r.release_date}</p>
      </>
    )
  }

  return (
    <>
      {section === 'movies' ? movies() : google()}
    </>
  )
}
export default ActivityCard