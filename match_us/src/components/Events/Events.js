/* eslint-disable no-unused-vars */
import React from 'react'
import moment from 'moment'
import Calender from './Calender'

class Events extends React.Component{
state= {
  date: moment().format('YYYY-MM-DD'),
  selected: ''
}

setDate = (d) => {
  const { date }  = this.state
  const selected = `${moment(date).format('YYYY-MM')}-${d}`
  this.setState({ selected })
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
  this.setState({ date })
}

render(){
  const { date } = this.state

  return (
    <>
      <h1> Calender</h1>

      <div className='calender'>
        <table className="calendar-day">

          <div className='modal center'>
            <div className='m-pop c-modal'>
              <h1> New Event</h1>
              <p>Title:</p>
              <p>Date:</p> {date}
              <p>Location:</p>
              <p>Notes:</p>
              <p>Type:</p>
            </div>
          </div>

          <Calender
            date={date}
            setDate={this.setDate}
            changeMonth={this.changeMonth}/>
        </table>
      </div>
    </>
  )
}
}

export default Events