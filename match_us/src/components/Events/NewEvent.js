/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios'
// import moment from 'moment'
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


handleChange= async (e) =>{
  const data = { ...this.state.data, [e.target.name]: e.target.value }
  this.setState({ data })
}

handleSubmit = async (e) => {
  e.preventDefault()
  const { connection, selected, getEvents, handleModal,user } = this.props
  const c = connection ? connection.id : this.state.data.connection 
  const data = { ...this.state.data, connection: c, date: selected.target.id, creator: user.id }
  await axios.post(`/api/events/post/${c}/`, data, headers())
  this.setState({ data: 
    { title: '',
      location: '',
      notes: '',
      type: '', 
      time: '',
      connection: '' }
  })
  getEvents(), handleModal()
}

handleLocation = (e) => {
  const data = { ...this.state.data, location: e }
  this.setState({ data })
}

render(){

  const { data } = this.state
  const { connection,connections } = this.props

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
          <input readOnly
            className='e-input n-line'
            value={this.props.selected.target.id}
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
          <input onChange={this.handleChange} type="radio"  name="date_type" value='🍩 Food'/>
          <label>🏓</label>
          <input onChange={this.handleChange} type="radio"  name="date_type" value='🏓 Sports'/>
          <label>💃</label>
          <input onChange={this.handleChange} type="radio"  name="date_type" value='💃 Music'/>
          <label>🍿</label>
          <input onChange={this.handleChange} type="radio"  name="date_type" value='🍿 Film'/>
          <label>♟️</label>
          <input onChange={this.handleChange} type="radio"  name="date_type" value='♟️ Indoor'/>
          <label>🎡</label>
          <input onChange={this.handleChange} type="radio"  name="date_type" value='🎡 Outdoor'/>
          <label>🏕️</label>
          <input onChange={this.handleChange} type="radio"  name="date_type" value='🏕️ Travel'/>
        </div>


        <button className='e-input auth-button'> New Event!</button>   
      </form>
    </>
  )
}
}


export default withRouter(NewEvent)