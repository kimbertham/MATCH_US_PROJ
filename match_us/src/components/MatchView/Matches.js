import React from 'react'
import { Link } from 'react-router-dom'
import all from '../../styles/assets/swipe-buttons/all-icon.jpg'
import view from '../../styles/assets/swipe-buttons/view-icon.jpg'


const Matches = ({ getDetail, matches,connection, section, changeView }) =>  {

  if (!matches) return null
  return (
    <>
      {/* <div className='swipe-matches'> */}
      {/* <p>Matches</p> */}
      {matches.map((m, i ) => {
        return <div key={i} className='relative center swipe-match-cont'> 
          <div className='flex' id={m.id} onClick={getDetail}/>
          <div className='swipe-match-icon' value={m.id} style={{ backgroundImage: `url(${m.image})` }}/>

          <p> {m.name.length > 20 ? `${m.name.slice(0,20)}...` : m.name }</p>
        </div>
      })}

      <div className='matches-footer flex'>

        <img src={view} onClick={changeView} className='all-icon' alt='list-view'/>
        <Link to={`/connection/${connection.id}/${section}/results`}> 
          <img src={all} className='all-icon' alt='all'/>
        </Link>
 
        {/* </div> */}
      </div>
    </>
  )
}

export default Matches