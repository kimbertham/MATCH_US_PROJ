/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios'
import moment from 'moment'

import { headers } from '../../Lib/auth'
import { getUserId } from '../../Lib/auth'

import Calender from './Calender'
import NewEvent from './NewEvent'

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

handleModal = (e) => {
  this.setState({ modal: !this.state.modal, selected: e.target.id })
}

changeMonth = (d) => {
  const year = Number(moment(this.state.date).format('YYYY'))
  const month = Number(moment(this.state.date).format('MM'))
  let date
  if (d === 'f') {
    month === 12 ? 
      date = `${year + 1}-01` : date = `${year}-${month + 1}`
  } else {
    month === 1 ? 
      date = `${year - 1}-12` : date = `${year}-${month - 1}`
  }
  this.setState({ date }, () =>{
    this.getEvents()
  })

}

getEvents = async() => {
  const month = { month: Number(moment(this.state.date).format('MM')) }
  const res = await axios.post(`/api/events/get/${getUserId()}/`, month, headers())
  this.setState({ events: res.data })
}


render(){
  const { date,modal ,selected, events } = this.state
  return (
    <>
      <h1> Calender</h1>

      <div className='calender'>
        <table className="calendar-day">

          <NewEvent
            modal={modal}
            date={selected}
            handleModal={this.handleModal}/>

          <Calender
            date={date}
            events={events}
            handleModal={this.handleModal}
            changeMonth={this.changeMonth}/>
        </table>
      </div>
    </>
  )
}
}

export default Events