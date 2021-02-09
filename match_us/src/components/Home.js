import React from 'react' 
import axios from 'axios'
import { getUserId } from '../Lib/auth'
import Menu from './Menu/Menu.js'
import Overview from './Overview'
import { Switch, Route } from 'react-router-dom'
import Wishlist from './Wishlist/Wishlist'

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

      <div className='fh flex'>

        <Menu page='home'
          user={user}
          connections={connections}/>

        <Switch>

          <Route path='/home/wishlist' render={() => 
            <Wishlist  name={user.first_name} id={user.id}/> }/>
            
          <Route path='/home' render={() => 
            <Overview  connections={connections} user={user}/> }/>

        
        </Switch>
      </div>
    )
  }
}
export default Home