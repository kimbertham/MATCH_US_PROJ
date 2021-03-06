import React from 'react' 
import { Link } from 'react-router-dom'

const EventsCard = ({ e }) => {

  return (
    <Link to={`/connection/${e.connection.id}/events`}>
      <div key={e.id} className='o-field' 
        style={{ background: e.request ? ' rgba(3, 72, 87, 0.4)'  : ' rgba(207, 77, 219, 0.2)' }}>
        <h3> {e.date_type} {e.title}</h3>
        <p>{e.connection.participants.map((p,i) =>  
          i === e.connection.participants.length - 1 ? `${p.first_name}` : `${p.first_name} & ` )}</p>
        <small> {e.date} {e.time.slice(0,5)}</small>
        <br/>
        <small> {e.location.split(',')[0]}</small>
        <br/>
      </div>
    </Link>
  )
}
export default EventsCard