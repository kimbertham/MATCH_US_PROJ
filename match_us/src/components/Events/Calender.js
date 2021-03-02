/* eslint-disable no-unused-vars */
import React from 'react'
import moment from 'moment'
import { regex } from '../../Lib/com'

const weekdays = moment.weekdaysShort()
const months =  moment.monthsShort()


const Calender = ({ date, changeMonth, events, setData, setReq, user }) => {
  const cMonth = (moment(date).format('MM'))
  const cYear = [Number(moment(date).format('YYYY'))]
  const blank = []
  const days = []

  if (!events) return null  

  for (let i = 0; i < moment(date).startOf('month').format('d') ; i++){
    blank.push( <td className='empty'> {''}</td>)
  }

  for (let d = 1; d <= moment(date).daysInMonth(); d++) {
    const date =  d.toString().length === 1 ? `${cYear}-${cMonth}-0${d}` : `${cYear}-${cMonth}-${d}`
    const noEvent = <td onClick={setData} className='calender-day' id={date}><p className='date'>{d}</p> </td>

    if (events.length > 0) {
      const e = events.filter(x=> x.date === date)
      e.length > 0 ? days.push(
        <td  onClick={setData} className='calender-day'  id={date}>
          <p className='date'>{d}</p>
          {e.map((x,i)=> {
            return <p className={`request ${x.request && x.creator === user.id ? 'green' : x.request ? 'purple' : 'date' }`}
              key={i}   onClick={ e =>{
                e.stopPropagation(), setReq(x)
              }}> {x.date_type.match(regex)} {x.title}</p>
          })}

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
    <div>
      <div className='calender-header flex'>
        <button className='calender-button ' onClick={()=>{
          changeMonth('b')
        }}> Back</button>
        <h2> {months[cMonth - 1 ]} {cYear}</h2>

        <button className='calender-button' onClick={()=>{
          changeMonth('f')
        }}> Next</button>
      </div>

      <div className='calendar-cont'>
        <table className='calender'>
          <tbody>
            <tr>{weekdays.map((day,i) => <th className='weekdays' key={i}>{day}</th>)}</tr>
            {rows.map((d, key) => 
              <tr  key={key}>{d}</tr>)}
          </tbody>
        </table>
      </div>
    </div>
    
  )
}


export default Calender