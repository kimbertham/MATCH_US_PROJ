import React from 'react'

const Matches = ({ getDetail, matches }) =>  {

  if (!matches) return null
  return (
    <>
      <div className='f-match'>
        {matches.map(m => {
          return <div key={m.f_id} className='relative center column f-match-cont'> 
            <div className='cover' id={m.f_id} onClick={getDetail}/>
            <div className='f-match-icon' value={m.f_id} style={{ backgroundImage: `url(${m.image})` }}/>

            <p> {m.name}</p>
          </div>
        })}
      </div>
    </>
  )
}

export default Matches