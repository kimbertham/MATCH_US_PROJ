/* eslint-disable no-unused-vars */
import React from 'react' 
import Image from './Common/Image'
import axios from 'axios' 
import { headers } from '../Lib/auth'
import { withRouter } from 'react-router-dom'

class Settings extends React.Component {
  state = {
    data: {
      first_name: '',
      last_name: '',
      username: '',
      email: ''
    }
  }

  async componentDidMount() {
    this.setState({ data: this.props.user })
  }

  handleChange = event => {
    try {
      const data = { ...this.state.data, [event.target.name]: event.target.value }
      this.setState({ data })
    } catch (err) {
      console.log(err)
    }
  }

  handleSubmit = async event => {
    event.preventDefault()
    try {
      await axios.patch(`/api/profile/${this.props.user.id}/`, 
        this.state.data , headers())
      this.props.getUser()
      this.props.history.push('/home')
    } catch (err) {
      console.log(err)
    }
  }

  handleImage = (img) => {
    const data = { ...this.state.data, profile_image: img }
    this.setState({ data })
  }


  render() {
    const { data } = this.state
    return (
      <div className='settings'>

        <h1>Settings</h1>

        <div className='s-img-cont'>
          <div className='s-img' style={{  
            backgroundImage: `url(${data.profile_image})`
          }}/>
        </div>

        <div className='s-field flex'>            
          <label className='label'> User Image: </label>
          <Image
            handleImage={this.handleImage}/>
        </div>
          
        <form onSubmit= {this.handleSubmit}>
          <div className='s-field'>            
            <label className='label'>First Name: </label>
            <br/>
            <input name="first_name"
              className='s-input'
              value={data.first_name}
              onChange={this.handleChange}/>
          </div>
              
          <div className='s-field'>            
            <label className='label'>Second Name: </label>
            <br/>
            <input name="last_name"
              className='s-input'
              value={data.last_name}
              onChange={this.handleChange}/>
          </div>

          <div className='s-field'>            
            <label className='label'>Username: </label>
            <br/>
            <input name="username"
              className='s-input'
              value={data.username}
              onChange={this.handleChange}/>
          </div>


          <div className='s-field'>            
            <label className='label'>Email: </label>
            <br/>
            <input name="email"
              className='s-input'
              value={data.email}
              onChange={this.handleChange}/>
          </div>

          <button className='button'> Save! </button>
        </form>
      </div>
    )
  }
}
export default withRouter(Settings)