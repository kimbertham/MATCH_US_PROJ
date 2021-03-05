/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios'
import moment from 'moment'
import { headers } from '../../Lib/auth'
import { withRouter } from 'react-router-dom'
import Calender from './Calender'
import NewEvent from './NewEvent'
import EventRequest from './EventRequest'
import EventList from './EventsList'


class Events extends React.Component{
state= {
  date: moment().format('YYYY-MM-DD'),
  modal: false,
  events: false,
  req: false
}

homepage = location.pathname.includes('home') ? 'home' : 'con'
eventsClass = location.pathname.includes('events') ? 'events' : 'overview'

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
  const { connection, user } = this.props
  const data = this.homepage === 'home' ?
    { month: Number(moment(this.state.date).format('MM')) ,section: 'home' } :
    { month: Number(moment(this.state.date).format('MM')) , section: 'con', connection: connection.id }

  const res = await axios.post(`/api/events/get/${user.id}/`, data, headers())
  this.setState({ events: res.data })
}

closeModal = () => {
  this.setState({ data: null, req: null })
}

setData = (i) => {
  this.setState({ data: { date: i } })
}

setReq = (r) => {
  this.setState({ req: r })
}

render(){
  const { date, events, data , req } = this.state
  const { connection, connections, user } =  this.props
  return (


    <div className='relative'>

      {data || req ? 
        <div onClick={this.closeModal} className='modal'>
          <div  className='m-pop'
            onClick={e => e.stopPropagation()}>
            
            {req ? 
              <EventRequest user={user}
                req={req}
                closeModal={this.closeModal}
                getEvents={this.getEvents}/>
              :
              <NewEvent data={data}
                connection={connection}
                connections={connections}
                closeModal={this.closeModal}
                getEvents={this.getEvents} />
            }
          </div>
        </div> : null}

      <div className='flex'>

        <Calender events={events}
          date={date}
          user={user}
          page={this.eventsClass}
          setData={this.setData}
          setReq={this.setReq}
          changeMonth={this.changeMonth}/>

        {this.eventsClass === 'events' ?
          <EventList events={events}
            setReq={this.setReq}/> 
          : null}
          
      </div>
    </div>
  )
}
}

export default withRouter(Events)