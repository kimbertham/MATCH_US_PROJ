import React from 'react' 

import { Switch, Route } from 'react-router-dom'

import Menu from './Menu/Menu.js'
import Overview from './Overview'
import Wishlist from './Wishlist/Wishlist'
import Settings from './Settings'

const Home = ({ user, connections, getCons, getUser })=> {

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