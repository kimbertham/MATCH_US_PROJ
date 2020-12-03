import React from 'react'
import axios from 'axios'

const EventRequest = ({ selected, getEvents, handleModal, user }) => {

  const accept = async () => {
    const data = { ...selected, connection: selected.connection.id, request: 'False' }
    await axios.put(`/api/events/${selected.id}/`, data)
    getEvents()
    handleModal()
  }

  const decline = async () => {
    await axios.delete(`/api/events/${selected.id}/`)
    getEvents()
    handleModal()
  }

  const request = selected.request ? 'display-block' : 'display-none'
  return (
    <>
      <div className='column'>

        <div className='e-request column' key={selected.id}>
          <h1>Date <span className={request}>request</span>!</h1> 

          <p>{selected.title}</p>
          <p>{selected.connection.participants.map(n=>`${n.first_name} `)}</p>
          <p>{selected.date} {selected.time} </p>
          <p>{selected.location} </p>
          <p>{selected.notes} </p>
          <p> {selected.date_type}</p>

          <div className={request}>
            {selected.creator === user.id ? <p>Waiting for response</p> :
              <>
                <button onClick={accept} className='accept-b'>Accept</button>
                <button  onClick={decline} className='decline-b'>decline</button>
              </>
            }

          </div>
        </div>
        
      </div>
    </>
  )
}

export default EventRequest