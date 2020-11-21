import React from 'react'

import { Switch, BrowserRouter,Route } from 'react-router-dom'

import Auth from './components/Auth/Auth'
import Home from './components/Home'


const App = () => {

  return (

    <BrowserRouter >

      <Switch>
        <Route path='/home/:id' component={Home}/>
        <Route path='/login' component={Auth}/>
      </Switch>
    </BrowserRouter>


  )
}

export default App
