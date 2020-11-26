import React from 'react'

import { Switch, BrowserRouter,Route } from 'react-router-dom'

import Auth from './components/Auth/Auth'
import Home from './components/Home.js'
import Connection from './components/Connection.js'

const App = () => {

  return (
    <>

      <BrowserRouter >
        <Switch>
          <Route path='/login' component={Auth}/>
          <Route path='/home' component={Home}/>
          <Route path='/connection/:id' component={Connection}/>
        </Switch>
      </BrowserRouter>
    </>

  )
}

export default App
