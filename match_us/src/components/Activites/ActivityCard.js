import React from 'react'
// import { GImages } from '../../Lib/common'

const ActivityCard = ({ a }) => {
  console.log(a)

  if (!a) return null

  // const image = a.photos ? `'${GImages}${a.photos[0].photo_reference}'` : 'https://bit.ly/2LG7Z7k'
  console.log
  return (
    <>
      <div className='activity-cont flex'>

        <div  style={{ backgroundImage: 'url(https://bit.ly/2LG7Z7k)' }} className='activity-img'/>
        <div>
          <h1>{a.name}</h1>
          <h2>{a.rating}</h2>
          <h2>{a.vicinity}</h2>

          <h2>{a.opening_hours ? a.opening_hours.open_now ? 'open' : 'closed' : null} </h2>
        </div>
        
        
        
        
      </div>
    </>
  )
}
export default ActivityCard