import React from 'react'
import { fDefault } from '../../Lib/common'

const FoodMatches = ({ getDetail, matches }) =>  {

  return (
    <>
      <div className='f-match'>
        {matches.map(m => {
          return <div key={m.f_id} className='relative center column f-match-cont'> 
            <div className='cover' id={m.f_id} onClick={getDetail}/>
            <div className='f-match-icon' value={m.f_id}
              style={{ backgroundImage: m.img ? `url(${m.img})` : fDefault }}/>
            <p> {m.name}</p>
          </div>
        })}
      </div>
    </>
  )
}

export default FoodMatches