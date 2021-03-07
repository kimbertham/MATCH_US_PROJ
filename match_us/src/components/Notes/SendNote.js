import React from 'react'
import axios from 'axios'
import { headers } from '../../Lib/auth'

class SendNote extends React.Component {
  state={
    data: {
      notes: '',
      color: 'rgba(255, 163, 247, 0.8)' }
  }

  handleChange= async (e) =>{
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    this.setState({ data })
  }

  handleSubmit = async (e) => {
    const { connection } = this.props
    e.preventDefault()
    const data = { ...this.state.data, connection: connection.id, reciever: connection.partner.id }
    await axios.post('/api/notes/', data, headers())
    this.props.sendNote()
  }

  render(){
    const { data } = this.state
    const { connection, sendNote } = this.props
    return (

      <div className='modal' onClick={sendNote}>
        <div className='m-pop' id='n-pop'  style={{ backgroundColor: data.color }}  onClick={e=> e.stopPropagation()}>

          <form onSubmit= {this.handleSubmit}>
            <div className='auth-head'>New Love Note</div>

            <div>    
              <label>To:</label>          
              <input readOnly
                value={connection.partner.first_name}/>
            </div>

            <div> 
              <label>From:</label>            
              <input readOnly
                value={connection.user.first_name}/>
            </div>

            <div>            
              <label>Note:</label>   
              <textarea
                name="notes"
                value={data.notes}
                onChange={this.handleChange}/>
            </div>

            <div>            
              <input
                name="color" 
                value={data.color}
                type="color"
                onChange={this.handleChange}/>
            </div>

            <button className='auth-button'> Send!</button>   
          </form>
        </div>
      </div>
    )
  }
}

export default SendNote