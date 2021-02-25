import React from 'react' 
import EventsCard from './EventsCard'

const OverviewEvent = ({ events, req }) => {
  return (
    <div className='flex'>

      <div>
        <h3> Date Requests</h3>
        <div className='o-container'>
          {req.map(e => {
            return <EventsCard  key={e.id} e={e}/>
          })}
        </div>
      </div>

      <div>
        <h3>Upcoming Dates</h3>
        <div className='o-container'>
          {events.map(e => {
            return <EventsCard  key={e.id} e={e}/>
          })}
        </div>
      </div>
    </div>

  )
}
export default OverviewEvent