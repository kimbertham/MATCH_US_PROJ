import React, { useEffect, useState } from 'react' 
import { Switch, Route } from 'react-router-dom'
import axios from 'axios'
import Menu from './Menu/Menu.js'
import Overview from './Overview'
import Wishlist from './Wishlist/Wishlist'
import Settings from './Settings'
import { getUserId } from '../Lib/auth'


const userId = getUserId()


const Home = ({ user, getCons, getUser })=> {
  const [connections, setConnections] = useState([])

  useEffect(() => getCons(), [])

  getCons =  async () => {
    const c = await axios.get(`/api/connections/${userId}/`)
    c.data.length > 0 && setConnections(c.data)
  }

  if (!user || !connections) return null
  return (
    <div className='flex'>

      <div>
        <Menu page='home'
          user={user}
          connections={connections}
          getCons={getCons}/>
      </div>

      <div className='main center' >
        <Switch>
          <Route path='/home/wishlist' render={() => 
            <Wishlist  
              user={user}/> }/>

          <Route path='/home/settings' render={() => 
            <Settings 
              user={user} 
              getUser={getUser}/> }/>

          <Route path='/home' render={() => 
            <Overview  
              connections={connections} 
              getCons={getCons}
              user={user}/> }/>
              
        </Switch>
      </div>
    </div>
  )
}

export default Home