import React from 'react' 
import axios from 'axios'
import { getUserId } from '../Lib/auth'
import Events from './Events/Events'
import Menu from './Menu/Menu.js'

const userId = getUserId()

class Home extends React.Component {
  state = {
    user: null
  }

  async componentDidMount() {
    this.getUser()
  }

  getUser = async () => {
    const res = await axios.get(`/api/profile/${userId}/`)
    const c = await axios.get(`/api/connections/${res.data.id}/`)
    c.data.map(c => c.participants = c.participants.find(u => u.id !== res.data.id))
    this.setState({ user: res.data ,connections: c.data })
  }

  render() {
    const { user, connections } = this.state

    if (!user) return null
    return (

      <div className='flex'>

        <Menu page='home'
          user={user}
          connections={connections}/>

        <div>
          <h1>{user.first_name}&apos;s Overview </h1>

          <Events page='h'
            connections={connections}
            user={user}/>
            
        </div> 

      </div>
    )
  }
}
export default Home