import React from 'react'

const Match = ({ buttons, connection, match, clear,img }) => {

  if (!match) return null
  return (
    <div onClick={clear} className='sw absolute'>
      <div className='fh match-modal'>
        <div className='sw fh match'>

          <h1> It&apos;s a match!</h1>
          <div className='flex'>
            <div className='match-p-img' 
              style={{ backgroundImage: `url(${connection.partner.profile_image})` }}/>
            <div className='match-p-img' 
              style={{ backgroundImage: `url(${connection.user.profile_image})` }}/>
          </div>

          <p>{connection.partner.first_name} swiped yes to {match.name} too!</p>
          <div className='match-img' 
            style={{ backgroundImage: `url(${img})` }}/>

          {buttons}
        
        </div>
      </div>
    </div>
  )

}

export default Match