/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { headers } from '../../Lib/auth'
import EventLocations from './EventLocations'


class NewEvent extends React.Component {
state= {
  data: {
    title: '',
    location: '',
    notes: '',
    date_type: '', 
    time: '',
    connection: ''
  }
}

componentDidMount() {
  this.setState({ data: 
    { ...this.state.data, 
      ...this.props.data, 
      connection: this.props.connection 
        ? this.props.connection.id : null } })
}

handleChange= async (e) =>{
  const data = { ...this.state.data, [e.target.name]: e.target.value }
  this.setState({ data })
}

handleSubmit = async (e) => {
  e.preventDefault()
  await axios.post('/api/events/', this.state.data, headers())
  this.props.getEvents ? this.props.getEvents() : null
  this.props.closeModal()
}

handleLocation = (e) => {
  const data = { ...this.state.data, location: e }
  this.setState({ data })
}


render(){
  console.log(this.state)
  const { data } = this.state
  const { connection,connections } = this.props
  return (
    <>
      <form className='e-form' onSubmit= {this.handleSubmit}>
        <h1>New Event</h1>

 
        <div className='form-field'>            
          <label>Title:</label>   
          <input
            name="title"
            value={data.title}
            onChange={this.handleChange} className='e-input'/>
        </div>
    
        <div className='form-field'>   
          <label className='label'>Daters: </label>
          {connection ?
            <input
              readOnly
              className='n-line'
              value={`${connection.partner.first_name}, ${connection.user.first_name}`}/>
            :
            <select 
              onChange={this.handleChange} className='e-input'
              name='connection'
              value={data.connection}>
              <option selected hidden> --- </option>  
              {connections.map(c => <option value={c.id} key={c.id}>{c.participants.first_name}</option>)}
            </select>
          }  
        </div>
        
        <div className='form-field'> 
          <label>Date:</label>     
          <input 
            type='date'
            name="date"
            className='e-input'
            value={data.date}
            onChange={this.handleChange} />
        </div>

        <div className='form-field'> 
          Time:
          <input
            name="time"
            type='time'
            value={data.time}
            onChange={this.handleChange} className='e-input'/>
        </div>

        <EventLocations
          location= {data.location}
          handleChange={this.handleChange}
          handleLocation={this.handleLocation}/>


        <div className='form-field'> 
          <label>Notes:</label>     
          <textarea
            name='notes'
            value={data.notes}
            onChange={this.handleChange} className='e-input'/>
        </div>

        <div className='flex'>
          <label>🍩</label>
          <input onChange={this.handleChange} className='e-input' type="radio" name='date_type' value='🍩'/>
          <label>🏓</label>
          <input onChange={this.handleChange} className='e-input' type="radio" name='date_type' value='🏓'/>
          <label>💃</label>
          <input onChange={this.handleChange} className='e-input' type="radio" name='date_type' value='💃'/>
          <label>🍿</label>
          <input onChange={this.handleChange} className='e-input' type="radio" name='date_type' value='🍿'/>
          <label>♟️</label>
          <input onChange={this.handleChange} className='e-input' type="radio" name='date_type' value='♟️'/>
          <label>🎡</label>
          <input onChange={this.handleChange} className='e-input' type="radio" name='date_type' value='🎡'/>
          <label>🏕️</label>
          <input onChange={this.handleChange} className='e-input' type="radio" name='date_type' value='🏕️'/>
        </div>
     


        <button className='button'> New Event!</button>   
      </form>
    </>
  )
}
}


export default withRouter(NewEvent)