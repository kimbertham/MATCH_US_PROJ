import React from 'react' 
import axios from 'axios'
import { getUserId } from '../Lib/auth'
import { Switch, Route } from 'react-router-dom'

import Menu from './Menu/Menu.js'
import Overview from './Overview'
import Wishlist from './Wishlist/Wishlist'
import Settings from './Settings'

const userId = getUserId()

class Home extends React.Component {
  state = {
    user: null
  }

  async componentDidMount() {
    this.getUser()
    this.getCons()
  }

  getUser = async () => {
    const res = await axios.get(`/api/profile/${userId}/`)
    this.setState({ user: res.data })
  }

  getCons =  async () => {
    const c = await axios.get(`/api/connections/${userId}/`)
    c.data.map(c => c.participants = c.participants.find(u => u.id !== userId))
    this.setState({ connections: c.data })
  }

  render() {
    const { user, connections } = this.state
    if (!user || !connections) return null
    return (
      <div className='flex'>

        <div>
          <Menu page='home'
            user={user}
            connections={connections}
            getCons={this.getCons}/>
        </div>

        <div className='main center' >
          <Switch>
            <Route path='/home/wishlist' render={() => 
              <Wishlist  name={user.first_name} id={user.id}/> }/>

            <Route path='/home/settings' render={() => 
              <Settings user={user} getUser={this.getUser}/> }/>

            <Route path='/home' render={() => 
              <Overview  connections={connections} getCons={this.getCons} user={user}/> }/>
              
          </Switch>
        </div>
      </div>
    )
  }
}
export default Home