/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios'
import moment from 'moment'
import { withRouter } from 'react-router-dom'
import { headers } from '../../Lib/auth'


class NewEvent extends React.Component {
state= {
  data: {
    title: '',
    location: '',
    notes: '',
    type: ''
  }
}

handleChange= (e) =>{
  const data = { ...this.state.data, [e.target.name]: e.target.value }
  this.setState({ data })
}

handleSubmit = async (e) => {
  e.preventDefault()

  const { connection, selected, getEvents, handleModal } = this.props
  const d = { title: '', location: '', notes: '', type: '' }
  const data = { ...this.state.data, date: selected.date }

  await axios.post(`/api/events/post/${connection.id}/`, data, headers())
  this.setState({ data: d })
  getEvents()
  handleModal()
}

render(){

  const { data } = this.state

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
          <label>Date:</label>     
          <input readOnly
            className='e-input n-line'
            value={this.props.selected.date}
            onChange={this.handleChange}/>
        </div>

        <div className='form-field'> 
          <label>Location:</label>     
          <input
            className='e-input'
            type='location'
            value={data.location}
            onChange={this.handleChange}/>
        </div>

        <div className='form-field'> 
          <label>Notes:</label>     
          <input
            className='e-input'
            type='notes'
            value={data.notes}
            onChange={this.handleChange}/>
        </div>

        <div className='form-field'> 
          <label>Type:</label>     
          <input
            className='e-input'
            type='type'
            value={data.type}
            onChange={this.handleChange}/>
        </div>

        <button className='e-input auth-button'> New Event!</button>   
      </form>
    </>
  )
}
}


export default withRouter(NewEvent)