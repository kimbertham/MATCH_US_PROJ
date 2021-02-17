/* eslint-disable no-unused-vars */
import React from 'react'
import moment from 'moment'

const Calender = ({ date, changeMonth, events, setData, setReq }) => {
  const emoji = ['\ud83c[\udf00-\udfff]','\ud83d[\udc00-\ude4f]','\ud83d[\ude80-\udeff]']

  const regex = new RegExp(emoji.join('|'), 'g')

  if (!events) return null  
  const weekdays = moment.weekdaysShort()
  const months =  moment.monthsShort()
  const cMonth = (moment(date).format('MM'))
  const cYear = [Number(moment(date).format('YYYY'))]
  const blank = []
  const days = []

  for (let i = 0; i < moment(date).startOf('month').format('d') ; i++){
    blank.push( <td className='empty'> {''}</td>)
  }

  for (let d = 1; d <= moment(date).daysInMonth(); d++) {
    const date =  d.toString().length === 1 ? `${cYear}-${cMonth}-0${d}` : `${cYear}-${cMonth}-${d}`
    const noEvent = <td onClick={setData} className='calender-day' key={d} id={date}> {d} </td>

    if (events.length > 0) {
      const e = events.filter(x=> x.date === date)
      e.length > 0 ? days.push(
        <td  onClick={setData} className='calender-day'  key={d}  id={date}>
          {d}
          {e.map(x=> {
            return <p  key={x.id}  className={`request ${x.request ? 'green' : null }`} onClick={ e =>{
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
    <>
      <table className='calender'>
        <div className='calender-header flex'>
          <button className='calender-button' onClick={()=>{
            changeMonth('b')
          }}> Back</button>
          <p> {months[cMonth - 1 ]} {cYear}</p>

          <button className='calender-button' onClick={()=>{
            changeMonth('f')
          }}> Next</button>
        </div>
        <tbody>
          <tr>{weekdays.map((day,i) => <th key={i}>{day}</th>)}</tr>
          {rows.map((d, i) => 
            <tr className='date' key={i} >{d}</tr>)}
        </tbody>
      </table>
    </>
  )
}


export default Calender