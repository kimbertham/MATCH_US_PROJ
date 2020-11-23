/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios'
import moment from 'moment'

import { headers } from '../../Lib/auth'


class NewEvent extends React.Component {
state= {
  data: {}
}

handleChange= (e) =>{
  const data = { ...this.state.data, [e.target.name]: e.target.value }
  this.setState({ data })
}


handleSubmit = async (e) => {
  e.preventDefault()
  const data = { ...this.state.data, date: this.props.date }
  console.log(data)
  await axios.post(`/events/post/${this.props.userId}/`, this.state.data, headers())
}

render(){
  const { data } = this.state
  const {  date, modal, handleModal } = this.props
  return (
    <>

      <div onClick={handleModal}
        className={modal ? 'modal' : 'display-none'}>

        <div  className='m-pop c-modal'
          onClick={e => e.stopPropagation()}>

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
                value={date}
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
        </div>
      </div>
    </>
  )
}
}


export default NewEvent