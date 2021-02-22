import React from 'react' 

const EventsCard = ({ e }) => {
  return (
  
    <div key={e.id} className={e.request ? 'o-date o-req' : 'o-date'}>
      <h3> {e.type} {e.title}</h3>
      <p> {e.date} {e.time.slice(0,5)}</p>
      <small> {e.location.split(',')[0]}</small>
      <br/>
      <small> - {e.notes}</small>
    </div>


  )
}
export default EventsCard