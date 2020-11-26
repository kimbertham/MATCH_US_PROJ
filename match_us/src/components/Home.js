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
    this.setState({ user: res.data })
  }

  render() {
    const { user } = this.state

    if (!user) return null
    return (

      <div className='flex'>

        <Menu user={user}/>

        <div className='main'>
          <h1>{user.first_name}&apos;s Overview </h1>
          <Events 
            user={user}
            page='h'/>
        </div> 

      </div>
    )
  }
}
export default Home