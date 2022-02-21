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
      connection: this.props.connection ? this.props.connection.id : null } 
  })
}

handleChange= async (e) =>{
  const data = { ...this.state.data, [e.target.name]: e.target.value }
  this.setState({ data })
}

handleSubmit = async (e) => {
  try {
    e.preventDefault()
    await axios.post('/api/events/', this.state.data, headers())
    this.props.getEvents ? this.props.getEvents() : null
    this.props.closeModal()
  } catch (err) {
    err.response.status === 422 ? 
      this.handleError() : null
  }
}

handleLocation = (e) => {
  const data = { ...this.state.data, location: e }
  this.setState({ data })
}

handleError = () => {
  this.setState({ error: true })
  setTimeout(() => this.setState({ error: false }), 1500)
}



render(){
  const { data , error } = this.state
  const { connection,connections } = this.props

  return (
    <>
      <form className='center' onSubmit= {this.handleSubmit}>
        <h1>New Event</h1>

        <div>            
          <label><small>*</small>Title:</label>   
          <input
            name="title"
            value={data.title}
            onChange={this.handleChange}/>
        </div>
    
        <div>   
          <label className='label'><small>*</small>Daters: </label>
          {connection ?
            <input
              readOnly
              className='n-line'
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
        
        <div> 
          <label><small>*</small>Date:</label>     
          <input 
            type='date'
            name="date"
            value={data.date}
            onChange={this.handleChange} />
        </div>

        <div> 
          <label><small>*</small>Time:</label>
          <input
            name="time"
            type='time'
            value={data.time}
            onChange={this.handleChange}/>
        </div>

        <EventLocations
          location= {data.location}
          handleChange={this.handleChange}
          handleLocation={this.handleLocation}/>


        <div> 
          <label>Notes:</label>     
          <textarea
            name='notes'
            value={data.notes}
            onChange={this.handleChange}/>
        </div>

        <div className='flex'>
          <label>🍩</label>
          <input onChange={this.handleChange} type="radio" name='date_type' value='🍩'/>
          <label>🏓</label>
          <input onChange={this.handleChange} type="radio" name='date_type' value='🏓'/>
          <label>💃</label>
          <input onChange={this.handleChange} type="radio" name='date_type' value='💃'/>
          <label>🍿</label>
          <input onChange={this.handleChange} type="radio" name='date_type' value='🍿'/>
          <label>♟️</label>
          <input onChange={this.handleChange} type="radio" name='date_type' value='♟️'/>
          <label>🎡</label>
          <input onChange={this.handleChange} type="radio" name='date_type' value='🎡'/>
          <label>🏕️</label>
          <input onChange={this.handleChange} type="radio" name='date_type' value='🏕️'/>
        </div>

        <small className={error ? 'shake-text' : 'display-none'}> All fields marked with an * are required</small>

        <button className='button'> New Event!</button>   
      </form>

    </>

  )
}
}


export default withRouter(NewEvent)