import React from 'react'
import EventRequest from './EventRequest'
import NewEvent from './NewEvent'


class EventModal extends React.Component {
state= {

}



render(){

  const {  selected, modal, handleModal, connection, getEvents } = this.props

  if (!selected) return null
  return (
    <>

      <div onClick={handleModal} className={modal ? 'modal' : 'display-none'}>
        <div  className='m-pop c-modal'
          onClick={e => e.stopPropagation()}>
            
          {selected.connection ?
          
            <EventRequest 
              handleModal={handleModal}
              getEvents={getEvents}
              selected={selected}/>
            :

            <NewEvent
              selected={selected}
              connection={connection}
              modal={modal}
              handleModal={handleModal}
              getEvents={getEvents} />

          }
        </div>
      </div>


    </>
  )
}
}


export default EventModal


