import React from 'react'
import axios from 'axios'
import { headers } from '../../Lib/auth'

class SendNote extends React.Component {
  state={

    data: {
      notes: '',
      color: '#ffa3f7cc' }
  }

  handleChange= async (e) =>{
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    this.setState({ data })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const data = { ...this.state.data, connection: this.props.connection.id }
    await axios.post('/api/notes/', data, headers())
    this.props.sendNote()
  }

  render(){
    const { data } = this.state
    const { connection, sendNote } = this.props
    return (
    
      <div className='modal' id='notes-modal' onClick={sendNote}>
        <div className='m-pop' id='notes-pop' onClick={e=> e.stopPropagation()}>

          <form className='event-form center' onSubmit= {this.handleSubmit}>
            <div className='auth-head'>New Love Note</div>

            <div className='form-field'>    
              <label>To:</label>          
              <input readOnly  className='e-input'
                value={connection.partner.first_name}/>
            </div>

            <div className='form-field'> 
              <label>From:</label>            
              <input readOnly className='e-input'
                value={connection.user.first_name}/>
            </div>

            <div className='form-field'>            
              <label>Note:</label>   
              <textarea className='e-input'
                name="notes"
                value={data.notes}
                onChange={this.handleChange}/>
            </div>

            <div className='form-field'>            
              <input cclassName='e-input'
                name="color" 
                value={data.color}
                type="color"
                onChange={this.handleChange}/>
            </div>

            <button className='e-input auth-button'> Send!</button>   
          </form>
        </div>
      </div>
    )
  }
}

export default SendNote