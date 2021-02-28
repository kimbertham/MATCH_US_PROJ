import React from 'react'
import { Link } from 'react-router-dom'
import all from '../../styles/assets/swipe-buttons/all-icon.jpg'
import view from '../../styles/assets/swipe-buttons/view-icon.jpg'


const Matches = ({ getDetail, matches,connection, section, changeView }) =>  {

  if (!matches) return null
  return (
    <>
  
      {matches.map((m, i ) => {
        return <div onClick={getDetail} key={i} className='sm-cont'> 
          <div className='flex' />
          <div className='sm-icon' id={m.id} style={{ backgroundImage: `url(${m.image})` }}/>
          <p id={m.id}> {m.name.length > 20 ? `${m.name.slice(0,20)}...` : m.name }</p>
        </div>
      })}

      <div className='sm-footer'>
        <img src={view} onClick={changeView} alt='list-view'/>
        <Link to={`/connection/${connection.id}/${section}/results`}> 
          <img src={all} alt='all'/>
        </Link>
      </div>
    </>
  )
}

export default Matches