import React from 'react'
import { Link } from 'react-router-dom'
import all from '../../styles/assets/swipe-buttons/all-icon.jpg'
import view from '../../styles/assets/swipe-buttons/view-icon.jpg'


const Matches = ({ getDetail, matches,connection, section, changeView }) =>  {

  if (!matches) return null
  return (
    <>

      {matches.map((m, i ) => {
        return <div onClick={getDetail} key={i} className='relative center pointer swipe-match-cont'> 
          <div className='flex' />
          <div className='swipe-match-icon' id={m.id} style={{ backgroundImage: `url(${m.image})` }}/>
          <p id={m.id}> {m.name.length > 20 ? `${m.name.slice(0,20)}...` : m.name }</p>
        </div>
      })}

      <div className='matches-footer flex'>

        <img src={view} onClick={changeView} className='all-icon' alt='list-view'/>
        <Link to={`/connection/${connection.id}/${section}/results`}> 
          <img src={all} className='all-icon' alt='all'/>
        </Link>
 
      </div>
    </>
  )
}

export default Matches