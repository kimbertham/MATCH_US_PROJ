import React from 'react' 
import axios from 'axios'
import { getUserId } from '../Lib/auth'
import Menu from './Menu/Menu'
import Calender from './Calender'

const user = getUserId()

class Home extends React.Component {
  state = {
    user: {},
    connection: ''
  }

  async componentDidMount() {
    const res = await axios.get(`/api/profile/${user}/`)
    this.setState({ user: res.data })
  }

  setCon = async (i ) => {
    const c = await axios.get(`/api/connection-full/${i}/`)
    this.setState({ connection: c.data  })

  }

  render(){

    const { user } = this.state
  
    if (!user.id) return null
    return (
      <div className='flex'>


        <Menu 
          setCon={this.setCon}
          user={user}/>

        <div className='main'>
          <h1>{user.first_name}&apos;s Overview </h1>
          <Calender/>
        </div>

      </div>
    )
  }
}
export default Home