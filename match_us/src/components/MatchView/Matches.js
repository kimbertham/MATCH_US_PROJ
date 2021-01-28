import React from 'react'

const Matches = ({ getDetail, matches }) =>  {

  if (!matches) return null
  return (
    <>
      <div className='f-match'>
        {matches.map((m, i ) => {
          return <div key={i} className='relative center column f-match-cont'> 
            <div className='cover' id={m.id} onClick={getDetail}/>
            <div className='f-match-icon' value={m.id} style={{ backgroundImage: `url(${m.image})` }}/>

            <p> {m.name}</p>
          </div>
        })}
        <p>All &gt;&gt; </p>
      </div>
    </>
  )
}

export default Matches