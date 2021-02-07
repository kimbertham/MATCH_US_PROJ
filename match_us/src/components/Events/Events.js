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
  modal: false,
  events: {},
  req: false
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
  const { page, connection, user } = this.props

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

closeModal = () => {
  this.setState({ data: null, req: null })
}

setData = (e) => {
  this.setState({ data: { date: e.target.id } })
}

setReq = (r) => {
  this.setState({ req: r })
}

render(){

  const { date, events, data , req } = this.state
  const { connection, connections, user } =  this.props
  return (


    <div className='test relative'>

      {data || req ? 
        <div onClick={this.closeModal} className='modal'>
          <div  className='m-pop c-modal'
            onClick={e => e.stopPropagation()}>
            
            {req ? 
              <EventRequest 
                user={user}
                req={req}
                getEvents={this.getEvents}/>
              :
              <NewEvent
                data={data}
                connection={connection}
                connections={connections}
                closeModal={this.closeModal}
                getEvents={this.getEvents} />
            }
          </div>
        </div> : null}

      <Calender
        date={date}
        events={events}
        setData={this.setData}
        setReq={this.setReq}
        changeMonth={this.changeMonth}/>

    </div>
  )
}
}

export default Events