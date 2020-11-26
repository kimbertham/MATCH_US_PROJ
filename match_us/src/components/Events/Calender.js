/* eslint-disable no-unused-vars */
import React from 'react'
import moment from 'moment'

const Calender = ({ date, handleModal, changeMonth, events }) => {
  
  if (!events) return null  

  const weekdays = moment.weekdaysShort()
  const months =  moment.monthsShort()
  const cMonth = [Number(moment(date).format('MM')) ]
  const cYear = [Number(moment(date).format('YYYY'))]

  const blank = []
  const days = []

  for (let i = 0; i < moment(date).startOf('month').format('d') ; i++){
    blank.push( <td className='empty'> {''}</td>)
  }

  for (let d = 1; d <= moment(date).daysInMonth(); d++) {
    const date =  d.toString().length === 1 ? `${cYear}-${cMonth}-0${d}` : `${cYear}-${cMonth}-${d}`
    const noEvent = <td onClick={handleModal} className='calender-day' key={d} id={date}> {d} </td>

    if (events.length >= 0) {
      const e = events.find(x=> x.date === date)
      e ? days.push(
        <td onClick={() => {
          handleModal(e)
        }} className='calender-day'  key={d}  id={date}>

          {d}
          <p className={!e.request ? 'green' : null }> {e.date}</p>

        </td> ) : days.push(noEvent)

    } else {
      days.push(noEvent)
    }
  }
  
  const total = [...blank, ...days]
  const rows = []
  let c = []

  total.forEach((row,i) => {
    if (i % 7 !== 0) {
      c.push(row)
    } else {
      rows.push(c)
      c = [] , c.push(row)
    }
    i === total.length - 1 ? rows.push(c) : null
  })

  return (
    <>
      <div className=' date-header flex'>
        <button onClick={()=>{
          changeMonth('b')
        }}> Back</button>
        <p> {months[cMonth - 1 ]} </p>
        <p> {cYear} </p>
        <button onClick={()=>{
          changeMonth('f')
        }}> Next</button>
      </div>

      <table className="calendar-day">
        <tbody>
          <tr>{weekdays.map(day => <th key={day} className="week-day">{day}</th>)}</tr>
          {rows.map((d, i) => 
            <tr key={i}>{d}</tr>)}
        </tbody>
      </table>
    </>
  )
}


export default Calender