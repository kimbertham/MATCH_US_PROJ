import React from 'react'
import { GImages, poster } from '../../Lib/common'

const Match = ({ buttons, connection, r, clear , section }) => {

  let img
  section === 'movies' ? 
    img = `${poster}${r.poster_path}` : 
    img = r.photos ? `${GImages}${r.photos[0].photo_reference}` : null
  

  if (!r) return null
  return (
    <div onClick={clear} className='sw absolute'>
      <div className='match-modal'>
        <div className='sw fh center'>

          <h1> It&apos;s a match!</h1>
          <div className='flex'>
            <div className='match-img match-p-img' 
              style={{ backgroundImage: `url(${connection.partner.profile_image})` }}/>
            <div className='match-img match-p-img' 
              style={{ backgroundImage: `url(${connection.user.profile_image})` }}/>
          </div>

          <p>{connection.partner.first_name} swiped yes to {r.name || r.title} too!</p>
          <div className='match-img' 
            style={{ backgroundImage: `url(${img})` }}/>

          {buttons}
        
        </div>
      </div>
    </div>
  )

}

export default Match