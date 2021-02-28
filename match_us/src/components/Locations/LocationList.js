/* eslint-disable no-unused-vars */
import React from 'react'
import Loader from '../Common/Loader'
const LocationList = ({ locations, selected,connection, listLocations, getDetail }) => {

  return (
    <>
      <h2>{connection.partner.first_name} & {connection.user.first_name}&apos;s Date Locations</h2>

      {locations.length <= 0 ? 
        <Loader type='Hearts' /> 
        :
        <>
          {locations.map((l,i) => {
            return <div key={i} ref={l => listLocations[i] = l} onClick={()=>{
              getDetail(l , i)
            }} className={`l-list-item ${selected === i ? 'l-select' : null}`}>

              <div className='center'>
                <p className='absolute'>{i + 1}</p>
                {selected === i ? 
                  <img src='https://bit.ly/3qavbJY'className='l-list-icon' alt='marker'/> :
                  <img src='https://bit.ly/3jxtH9Y'className='l-list-icon' alt='marker'/>}
              </div>
              <div>
                <h4>{l.address}</h4>
                <p className='italic'> - {l.title}</p>
              </div>
              <img src='https://bit.ly/2LEgyPX' className='l-arrow' alt='info'/>
            </div>
          })}
        </>
      }
    </>
  )
}

export default LocationList