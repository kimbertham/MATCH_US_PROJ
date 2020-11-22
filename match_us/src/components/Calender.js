import React from 'react'
import moment from 'moment'

class Calender extends React.Component{
state= {
  weekday: moment.weekdaysShort(),
  date: moment().format('YYYY-MM-DD')
}

  firstDayOfMonth = () => {
    return  moment(this.state.date).startOf('month').format('d')
  }

  render(){
    const {  weekday, date } = this.state

    
    const blanks = []
    for (let i = 0; i < this.firstDayOfMonth(); i++){
      blanks.push(
        <td className='calender-day empty'> {''}</td>
      )
    }

    const daysInMonth = []
    for (let d = 1; d <= moment(date).daysInMonth(); d++) {
      daysInMonth.push(
        <td key={d} className='calender-day'>{d}</td>
      )
    }

    const total = [...blanks, ...daysInMonth]
    const rows = []
    let cells = []

    total.forEach((row,i) => {
      if (i % 7 !== 0) {
        cells.push(row)
      } else {
        rows.push(cells)
        cells = [] 
        cells.push(row)
      }
      if (i === total.length - 1) {
        rows.push(cells)
      }
    })

    const daysinmonth = rows.map(d => <tr key={d}>{d}</tr> )
  
    return (
      <>
        <h1> Calender</h1>

        {weekday.map(d => 
          <ty key={d} className='weekday'> {d} </ty>
        )}
        <table className="calendar-day">
          <tbody>{daysinmonth}</tbody>
        </table>
      </>
    )
  }
}

export default Calender