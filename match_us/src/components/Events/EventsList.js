import React from 'react'

import EventsCard from './EventsCard'

const  EventList =  ({ events, setReq }) => {
  if (!events) return null

  return (
    <div className='e-list'>

      <h1 className='title'> Events</h1>
      {events.map(e => {
        return <div key={e.id} id={e.id} onClick={() => {
          setReq(e)
        }}>
          <EventsCard  e={e}/>
        </div>
      })}

    </div>
  
  )
}
export default EventList