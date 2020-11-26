import React from 'react'
import axios from 'axios'

const EventRequest = ({ selected, getEvents, handleModal }) => {

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
      <div className='e-request column'>
        <h1>Date <span className={request}>request</span>!</h1> 

        <p>{selected.title} </p>
        <p>{selected.date} </p>
        <p>{selected.location} </p>
        <p>{selected.notes} </p>

        <div onClick={decline} className={'e-delete'}> delete</div>

        <div className={request}>
          <button onClick={accept} className='accept-b'>Accept</button>
          <button  onClick={decline} className='decline-b'>decline</button>
        </div>

      </div>
    </>
  )
}

export default EventRequest