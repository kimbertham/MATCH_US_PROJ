/* eslint-disable no-unused-vars */
import React from 'react'
import moment from 'moment'

const Calender = ({ date, setDate, changeMonth }) => {

  const weekdays = moment.weekdaysShort()
  const months =  moment.monthsShort()
  const currentMonth = months[Number(moment(date).format('MM')) - 1]
  const currentYear = Number(moment(date).format('YYYY'))

  const blank = []
  for (let i = 0; i < moment(date).startOf('month').format('d') ; i++){
    blank.push( <td className='empty'> {''}</td>)
  }

  const days = []
  for (let d = 1; d <= moment(date).daysInMonth(); d++) {
    days.push( <td key={d} onClick={() => { 
      setDate(d)
    }} className='calender-day'> {d}</td>)
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
    i === total.length - 1 ? rows.push(c) : ''
  })

  return (
    <>
      <div className=' date-header flex'>
        <button onClick={()=>{
          changeMonth('b')
        }}> Back</button>
        <tr> {currentMonth}</tr>
        <tr> {currentYear}</tr>
        <button onClick={()=>{
          changeMonth('f')
        }}> Next</button>
      </div>
            
      <tr>{weekdays.map(day => <th key={day} className="week-day">{day}</th>)}</tr>

      <tbody>
        {rows.map((d, i) => 
          <tr key={i}>{d}</tr>)}
      </tbody>
        
    </>
  )
}


export default Calender