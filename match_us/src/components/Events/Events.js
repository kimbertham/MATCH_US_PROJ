/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios'
import moment from 'moment'
import { headers } from '../../Lib/auth'
import Calender from './Calender'
import NewEvent from './NewEvent'
import EventRequest from './EventRequest'


class Events extends React.Component{
state= {
  date: moment().format('YYYY-MM-DD'),
  selected: '',
  modal: false,
  events: {}
}

componentDidMount() {
  this.getEvents()
}

changeMonth = (d) => {
  const year = Number(moment(this.state.date).format('YYYY'))
  const month = Number(moment(this.state.date).format('MM'))
  let date
  
  if (d === 'f') {
    month === 12 ? date = `${year + 1}-01` : date = `${year}-${month + 1}`
  } else {
    month === 1 ? date = `${year - 1}-12` : date = `${year}-${month - 1}`
  }
  this.setState({ date }, () =>{
    this.getEvents()
  })
}

getEvents = async() => {
  let data
  const { page,connection,user } = this.props

  page === 'h' ? 
    data = {
      month: Number(moment(this.state.date).format('MM')) ,
      section: 'h' }
    : 
    data = { 
      month: Number(moment(this.state.date).format('MM')) ,
      section: 'r', 
      connection: connection.id }

  const res = await axios.post(`/api/events/get/${user.id}/`, data, headers())
  this.setState({ events: res.data })
}

handleModal = (e) => {
  this.setState({ 
    selected: e,
    modal: !this.state.modal
  })
}

render(){

  const { date, modal ,selected, events } = this.state
  const { connection, connections, user } =  this.props

  return (

    <div className='calender'>

      {selected ? <div onClick={this.handleModal} className={modal ? 'modal' : 'display-none'}>
        <div  className='m-pop c-modal'
          onClick={e => e.stopPropagation()}>
            
          {selected.id > 0 ?
            <EventRequest 
              user={user}
              selected={selected}
              handleModal={this.handleModal}
              getEvents={this.getEvents}/>
            :
            <NewEvent
              user={user}
              selected={selected}
              connection={connection}
              connections={connections}
              handleModal={this.handleModal}
              getEvents={this.getEvents} />
          }
        </div>
      </div> : null}

      <Calender
        date={date}
        events={events}
        handleModal={this.handleModal}
        changeMonth={this.changeMonth}/>

    </div>
  )
}
}

export default Events