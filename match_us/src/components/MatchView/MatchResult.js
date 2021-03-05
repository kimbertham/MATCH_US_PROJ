import React from 'react'
import { GImages, poster } from '../../Lib/common'

const Match = ({ buttons, connection, r, clear , section }) => {

  const img = section === 'movies' ?  `${poster}${r.poster_path}` : r.photos ? `${GImages}${r.photos[0].photo_reference}` : null
  
  if (!r) return null
  return (
    <div onClick={clear} className='full'>
      <div className='rm-modal'>

        <h1> It&apos;s a match!</h1>

        <div className='flex'>
          <div className='rm-img rmp-img' 
            style={{ backgroundImage: `url(${connection.partner.profile_image})` }}/>
          <div className='rm-img rmp-img' 
            style={{ backgroundImage: `url(${connection.user.profile_image})` }}/>
        </div>

        <p>{connection.partner.first_name} swiped yes to {r.name || r.title} too!</p>

        <div className='rm-img' 
          style={{ backgroundImage: `url(${img})` }}/>

        {buttons}
        
      </div>
    </div>
  )

}

export default Match