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
    type: '', 
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

  const { data } = this.state
  const { connection,connections } = this.props
  if (!connection) return null
  return (
    <>
      <form className='event-form center' onSubmit= {this.handleSubmit}>
        <div className='auth-head'>New Event</div>
        <div className='form-field'>            
          <label>Title:</label>   
          <input
            className='e-input'
            name="title"
            value={data.title}
            onChange={this.handleChange}/>
        </div>
    
        <div className='form-field'>   
          <label className='label'>Daters: </label>
          {connection ?
            <input
              readOnly
              className='e-input n-line'
              value={`${connection.partner.first_name}, ${connection.user.first_name}`}/>
            :
            <select 
              onChange={this.handleChange}
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
            className='e-input n-line'
            value={data.date}
            onChange={this.handleChange}/>
        </div>

        <div className='form-field'> 
          <label>Time:</label>     
          <input
            className='e-input'
            name="time"
            type='time'
            value={data.time}
            onChange={this.handleChange}/>
        </div>

        <EventLocations
          location= {data.location}
          handleChange={this.handleChange}
          handleLocation={this.handleLocation}/>

        <div className='form-field'> 
          <label>Notes:</label>     
          <textarea
            className='e-input'
            name='notes'
            value={data.notes}
            onChange={this.handleChange}/>
        </div>

        <div className='flex'>
          <label>🍩</label>
          <input onChange={this.handleChange} type="radio" checked={data.type === 'food'} value='🍩 Food'/>
          <label>🏓</label>
          <input onChange={this.handleChange} type="radio" checked={data.type === 'sports'}  value='🏓 Sports'/>
          <label>💃</label>
          <input onChange={this.handleChange} type="radio" checked={data.type === 'music'} value='💃 Music'/>
          <label>🍿</label>
          <input onChange={this.handleChange} type="radio" checked={data.type === 'film'} value='🍿 Film'/>
          <label>♟️</label>
          <input onChange={this.handleChange} type="radio" hecked={data.type === 'indoor'} value='♟️ Indoor'/>
          <label>🎡</label>
          <input onChange={this.handleChange} type="radio" hecked={data.type === 'outdoor'} value='🎡 Outdoor'/>
          <label>🏕️</label>
          <input onChange={this.handleChange} type="radio" hecked={data.type === 'travel'} value='🏕️ Travel'/>
        </div>


        <button className='e-input auth-button'> New Event!</button>   
      </form>
    </>
  )
}
}


export default withRouter(NewEvent)