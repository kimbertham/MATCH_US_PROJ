import React from 'react'
import axios from 'axios'
import Register from './Register'
import Login from './Login'
// import { getUserId } from '../Lib/auth'

class Auth extends React.Component {
  state = {
    data: {},
    form: true,
    invalid: false
  }

  handleChange = (e) => {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    this.setState({ data })
  }

login = async (e) => {
  e.preventDefault()
  try {
    const res = await axios.post('/api/login/', { ...this.state.data })
    window.localStorage.setItem('token', res.data.token)
  } catch (err) {
    this.setState({ invalid: true })
    setTimeout(() => this.setState({ invalid: false }), 1000)
  }
}

register = async (e) => {
  e.preventDefault()
  try {
    await axios.post('/api/register/', { ...this.state.data })
    this.setState({ form: true })
  } catch (err) {
    this.setState({ invalid: true })
    setTimeout(() => this.setState({ invalid: false }), 1000)
  }
}

  handleForm = () => {
    this.setState({ form: !this.state.form })
  }

  render(){
    const { form , data, invalid } = this.state

    return (
      <div className='a-cont center fp'>

        <div className='a-logo-wrap relative center'>
          <img 
            className='a-logo' alt='logo'
            src='https://i.imgur.com/VfFxGMN.jpg'/>
          <p>Match Us</p>
          <p className='a-logo-sub absolute bottom'>
            Make every date the best date
          </p>
        </div>
      
        <div className='a-form-cont center'>
          {form ?
            <Login
              change={this.handleChange}
              submit={this.login}
              form={this.handleForm}
              data={data}/>
            :
            <Register
              change={this.handleChange}
              submit={this.register}
              form={this.handleForm}
              data={data}/>
          }
          <p className={invalid ? 'shake-text' : 'display-none' }> 
          Invalid! Please try again!
          </p>
        </div>
      </div>
    )
  }
}

export default Auth