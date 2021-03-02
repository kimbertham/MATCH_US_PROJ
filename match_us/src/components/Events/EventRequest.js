import React from 'react'
import axios from 'axios'

const EventRequest = ({ req, getEvents, closeModal, user }) => {

  const accept = async () => {
    const data = { ...req, connection: req.connection.id, request: 'False' }
    await axios.put(`/api/events/${req.id}/`, data)
    getEvents()
    closeModal()
  }

  const decline = async () => {
    await axios.delete(`/api/events/${req.id}/`)
    getEvents()
    closeModal()
  }

  const request = req.request ? 'display-block' : 'display-none'

  return (
    <>
      <div className='column' key={req.id}>
        <h1>Date <span className={request}>request</span>!</h1> 

        <p>{req.title}</p>
        <p>{req.connection.participants.map(n=>`${n.first_name} `)}</p>
        <p>{req.date} {req.time} </p>
        <p>{req.location} </p>
        <p>{req.notes} </p>
        <p> {req.date_type}</p>

        <div className={request}>
          {req.creator === user.id ? <p>Waiting for response</p> :
            <>
              <button onClick={accept} className='button'>Accept</button>
              <button  onClick={decline} className='button'>decline</button>
            </>
          }
        </div>
        <div className={req.request ? 'display-none' : null}>
          <button onClick={decline} className='button'>Cancel</button>
        </div>
      </div>
    </>
  )
}

export default EventRequest